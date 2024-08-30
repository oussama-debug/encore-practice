import { TOPICAccountEvents } from "@/packages/types/user";
import { Topic } from "encore.dev/pubsub";

export const TOPICPaymentsAccount = new Topic<TOPICAccountEvents>(
  "payments-account",
  {
    deliveryGuarantee: "exactly-once",
  }
);
