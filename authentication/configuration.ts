import { secret } from "encore.dev/config";
import { SQLDatabase } from "encore.dev/storage/sqldb";
import knex from "knex";

export const clerkSecretKey = secret("CLERK_SECRET_KEY");

export const databaseClient = new SQLDatabase("zenlanes_users", {
  migrations: "./migrations",
});

export const databaseORM = knex({
  client: "pg",
  connection: databaseClient.connectionString,
});
