import { Subscription } from "encore.dev/pubsub";
import { Topic } from "encore.dev/pubsub";
import { SUBCreateCustomerAndAccountEvent } from "./common/account/account";

export const paymentsAccount = new Topic<SUBCreateCustomerAndAccountEvent>(
  "payments-account",
  {
    deliveryGuarantee: "exactly-once",
  }
);

const _ = new Subscription(paymentsAccount, "create-account", {
  handler: async (event) => {
    // TODO: create stripe customer and account
  },
});
