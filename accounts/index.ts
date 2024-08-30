import { SQLDatabase } from "encore.dev/storage/sqldb";
import knex from "knex";
import Stripe from "stripe";
import { stripeSecretKey } from "./secrets";

export const stripeClient = new Stripe(stripeSecretKey(), {
  apiVersion: "2024-06-20",
});

export const databaseClient = new SQLDatabase("accounts", {
  migrations: "./migrations",
});

export const databaseORM = knex({
  client: "pg",
  connection: databaseClient.connectionString,
});
