
import { TOPICIntegrationsAccount } from "@/packages/topics/accounts/integrations";
import { Subscription } from "encore.dev/pubsub";

const _ = new Subscription(TOPICIntegrationsAccount, "slack-integration", {
  handler: async (event) => {
    switch (event.event) {
      case "create-slack": {
        console.log(event)
        break;
      }
    }
  },
});
