import { Subscription } from "encore.dev/pubsub";
import { stripeClient } from ".";
import { TOPICPaymentsAccount } from "@/packages/topics/accounts/payments";

const _ = new Subscription(TOPICPaymentsAccount, "create-payments-account", {
  handler: async (event) => {
    switch (event.event) {
      case "create-payments-account": {
        const stripeCustomerId = await stripeClient.customers.create({
          email: event.user_email,
          metadata: { id: event.userID },
        });

        break;
      }
    }
  },
});
