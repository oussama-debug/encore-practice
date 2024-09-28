import { TOPICStoreEvents } from "@/packages/types/user";
import { Topic } from "encore.dev/pubsub";

export const TOPICStoreAccount = new Topic<TOPICStoreEvents>("store-account", {
  deliveryGuarantee: "exactly-once",
});
