import { TOPICAccountEvents } from "@/packages/types/user";
import { Topic } from "encore.dev/pubsub";

export const TOPICIntegrationsAccount = new Topic<TOPICAccountEvents>(
  "integrations-account",
  {
    deliveryGuarantee: "exactly-once",
  }
);
