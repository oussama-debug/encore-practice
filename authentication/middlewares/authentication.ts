import { Effect } from "effect";
import { createClerkClient, verifyToken } from "@clerk/backend";
import {
  AuthenticationPublicData,
  AuthenticationHeaderParameters,
} from "@/packages/types/user";
import { clerkSecretKey } from "@/authentication/configuration";
import { APIError } from "encore.dev/api";
import { authHandler } from "encore.dev/auth";
import { databaseORM } from "@/authentication/configuration";

export const clerkClient = createClerkClient({ secretKey: clerkSecretKey() });

export const authenticationHandler = authHandler<
  AuthenticationHeaderParameters,
  AuthenticationPublicData
>(async (params): Promise<AuthenticationPublicData> => {
  if (!params.authorization)
    throw APIError.unauthenticated(
      `This endpoint requires an authorization header`
    );

  // validate the token
  const getSessionIdFromToken = Effect.tryPromise({
    try: () =>
      verifyToken(params.authorization.split(" ")[1], {
        secretKey: clerkSecretKey(),
        authorizedParties: [
          "http://localhost:4000",
          "http://localhost:3000",
          "api.zenlanes.com",
        ],
      }),
    catch: (error) => {
      throw APIError.unauthenticated(
        `This endpoint requires a valid authorization header`
      );
    },
  });
  const sessionToken = await Effect.runPromise(getSessionIdFromToken);

  // get the session object from Clerk
  const getSessionFromId = Effect.tryPromise({
    try: () => clerkClient.sessions.getSession(sessionToken.sid),
    catch: () => {
      throw APIError.unauthenticated(
        `This endpoint failed to get session object`
      );
    },
  });
  const sessionObject = await Effect.runPromise(getSessionFromId);

  // match the session object with database
  const user = await databaseORM("users")
    .select("*")
    .where("user_clerk_id", sessionObject.userId)
    .first();

  if (!user)
    APIError.unauthenticated(`This endpoint failed to get user object`);

  if (user)
    return {
      id: user?.id!,
      userID: user?.id!,
      username: user?.username!,
      user_clerk_id: user?.user_clerk_id!,
      first_name: user?.first_name!,
      last_name: user?.last_name!,
      created_at: user?.created_at!,
      updated_at: user?.updated_at!,
    };
  return { userID: sessionToken.sub };
});
