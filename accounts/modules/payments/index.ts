import {
  databaseORM,
  freemiumPackageId,
  stripeClient,
} from "@/accounts/configuration";
import moment from "moment";
import { TOPICAccountEvents } from "@/packages/types/user";
import { sha256 } from "js-sha256";

export async function createPaymentsAccount(event: TOPICAccountEvents) {
  try {
    const customer = await stripeClient.customers.create({
      name: event.user_fullname as string,
      email: event.user_email as string,
      metadata: { id: event.userID as string },
    });

    const freemiumProduct = await stripeClient.prices.list({
      product: freemiumPackageId(),
      active: true,
    });

    const stripeAccountId = await stripeClient.subscriptions.create({
      customer: customer.id,
      items: [{ price: freemiumProduct.data[0].id }],
      payment_behavior: "allow_incomplete",
      collection_method: "charge_automatically",
    });

    //create the account
    const account = await databaseORM("accounts")
      .insert({
        name: event.user_fullname as string,
        stripe_customer_id: customer.id,
        stripe_membership_id: stripeAccountId.id,
        sha256: sha256(stripeAccountId.id + event.userID).toLowerCase(),
        username: sha256(stripeAccountId.id + event.userID).toLowerCase(),
        owner_id: event.userID as string,
      })
      .returning("*");

    //create the subscription object
    await databaseORM("subscriptions").insert({
      price_id: freemiumProduct.data[0].id,
      renewal_date: moment(stripeAccountId.current_period_end * 1000).toDate(),
      start_date: moment(stripeAccountId.current_period_start * 1000).toDate(),
      subscription_type: "free",
      account_id: account![0].id,
    });
  } catch (error) {
    console.error(error);
  }
}
