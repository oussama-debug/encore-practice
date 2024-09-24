import { secret } from "encore.dev/config";
import { SQLDatabase } from "encore.dev/storage/sqldb";
import knex from "knex";
import Stripe from "stripe";

export const stripeSecretKey = secret("STRIPE_SECRET_KEY");

export const stripeClient = new Stripe(stripeSecretKey(), {
  apiVersion: "2024-06-20",
});

export const databaseClient = new SQLDatabase("zenlanes_workspaces", {
  migrations: "./migrations",
});

export const databaseORM = knex({
  client: "pg",
  connection: databaseClient.connectionString,
});
