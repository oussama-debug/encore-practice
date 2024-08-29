import { SQLDatabase } from "encore.dev/storage/sqldb";
import knex from "knex";

export const databaseClient = new SQLDatabase("url", {
  migrations: "./migrations",
});

export const databaseORM = knex({
  client: "pg",
  connection: databaseClient.connectionString,
});
