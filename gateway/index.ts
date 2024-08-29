import { SQLDatabase } from "encore.dev/storage/sqldb";
import { Gateway } from "encore.dev/api";
import { authHandler } from "encore.dev/auth";
import knex from "knex";
import {
  AuthenticationPublicData,
  AuthenticationHeaderParameters,
} from "./common/authentication";

export const databaseClient = new SQLDatabase("url", {
  migrations: "./migrations",
});

export const databaseORM = knex({
  client: "pg",
  connection: databaseClient.connectionString,
});

export const authenticationHandler = authHandler<
  AuthenticationHeaderParameters,
  AuthenticationPublicData
>(async (params) => {
  // TODO: parse the JWT token and match it with db
  return {
    id: "oussama",
    stripe_customer_id: "oussama",
    user_clerk_id: "oussama",
    created_at: "oussama",
    updated_at: "oussama",
    userID: "oussama",
  };
});

export const gateway = new Gateway({ authHandler: authenticationHandler });
