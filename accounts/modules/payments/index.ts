import { databaseORM, stripeClient } from "@/accounts/configuration";
import { sha256 } from "js-sha256";

export async function createPaymentsAccount(event: any) {
  const hash256 = sha256.create();

  await stripeClient.customers.create({
    name: event.user_fullname,
    email: event.user_email,
    metadata: { id: event.userID },
  });

  const stripeAccountId = await stripeClient.accounts.create({
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
  });

  await databaseORM("accounts").insert({
    name: event.user_fullname,
    stripe_account_id: stripeAccountId.id,
    sha256: hash256
      .update(stripeAccountId.id + event.userID)
      .hex()
      .toLowerCase(),
    owner_id: event.userID,
  });
}
