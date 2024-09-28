import { secret } from "encore.dev/config";
import { SQLDatabase } from "encore.dev/storage/sqldb";
import knex from "knex";
import Stripe from "stripe";

export const stripeSecretKey = secret("STRIPE_SECRET_KEY");
export const slackAppId = secret('SLACK_SECRET_APP_ID');
export const slackClientId = secret('SLACK_SECRET_CLIENT_ID');
export const slackClientSecret = secret('SLACK_SECRET_CLIENT_SECRET');
export const slackSigningKey = secret('SLACK_SECRET_SIGNING_KEY');

export const stripeClient = new Stripe(stripeSecretKey(), {
  apiVersion: "2024-06-20",
});

export const databaseClient = new SQLDatabase("zenlanes_channels", {
  migrations: "./migrations",
});

export const databaseORM = knex({
  client: "pg",
  connection: databaseClient.connectionString,
});
