import { SQLDatabase } from "encore.dev/storage/sqldb";
import { APIError, Gateway } from "encore.dev/api";
import { authHandler } from "encore.dev/auth";
import knex from "knex";
import { Effect } from "effect";
import { verifyToken } from "@clerk/backend";
import { createClerkClient } from "@clerk/backend";
import {
  AuthenticationPublicData,
  AuthenticationHeaderParameters,
} from "./common/authentication";
import { clerkSecretKey } from "./secrets";

export const databaseClient = new SQLDatabase("url", {
  migrations: "./migrations",
});

export const databaseORM = knex({
  client: "pg",
  connection: databaseClient.connectionString,
});

export const clerkClient = createClerkClient({ secretKey: clerkSecretKey() });

export const authenticationHandler = authHandler<
  AuthenticationHeaderParameters,
  AuthenticationPublicData
>(async (params): Promise<AuthenticationPublicData> => {
  if (!params.authorization)
    APIError.unauthenticated(`This endpoint requires an authorization header`);

  // validate the token
  const getSessionIdFromToken = Effect.tryPromise({
    try: () =>
      verifyToken(params.authorization, {
        secretKey: clerkSecretKey(),
        authorizedParties: ["http://localhost:4000", "api.zenlanes.com"],
      }),
    catch: () =>
      APIError.unauthenticated(
        `This endpoint requires a valid authorization header`
      ),
  });
  const sessionToken = await Effect.runPromise(getSessionIdFromToken);

  // get the session object from Clerk
  const getSessionFromId = Effect.tryPromise({
    try: () => clerkClient.sessions.getSession(sessionToken.sid),
    catch: () =>
      APIError.unauthenticated(`This endpoint failed to get session object`),
  });
  const sessionObject = await Effect.runPromise(getSessionFromId);

  // match the session object with database
  const user = await databaseORM("users")
    .select("*")
    .where("user_clerk_id", sessionObject.userId)
    .first();

  if (!user)
    APIError.unauthenticated(`This endpoint failed to get user object`);

  return {
    id: user?.id!,
    userID: user?.id!,
    username: user?.username!,
    user_clerk_id: user?.user_clerk_id!,
    stripe_customer_id: user?.stripe_customer_id ?? "",
    created_at: user?.created_at!,
    updated_at: user?.updated_at!,
  };
});

export const gateway = new Gateway({ authHandler: authenticationHandler });
