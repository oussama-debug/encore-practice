import { Attribute } from "encore.dev/pubsub";

// accounts events
export interface SUBCreateCustomerAndAccountEvent {
  userID: string;
  event: Attribute<string>;
}
