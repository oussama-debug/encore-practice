
import { Subscription } from "encore.dev/pubsub";
import { TOPICPaymentsAccount } from "@/packages/topics/accounts/payments";
import { createPaymentsAccount } from "./modules/payments";

const _ = new Subscription(TOPICPaymentsAccount, "create-payments-account", {
  handler: async (event) => {
    switch (event.event) {
      case "create-payments-account": {
        await createPaymentsAccount(event);
        break;
      }
    }
  },
});
