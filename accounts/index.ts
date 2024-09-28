import { Subscription } from "encore.dev/pubsub";
import { TOPICPaymentsAccount } from "@/packages/topics/accounts/payments";
import { createPaymentsAccount } from "./modules/payments";
import { TOPICStoreAccount } from "@/packages/topics/accounts/store";

const paymentsAndAccountSettings_ = new Subscription(TOPICPaymentsAccount, "payments-account", {
  handler: async (event) => {
    switch (event.event) {
      case "create-payments-account": {
        await createPaymentsAccount(event);
        break;
      }
    }
  },
});

const storeSettings_ = new Subscription(TOPICStoreAccount, 'store-account', {
  handler: async(event) => {
    switch(event.event) {
      case 'create-store-account': {
        break;
      }
    }
  }
})