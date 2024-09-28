import { Attribute } from "encore.dev/pubsub";
import { User } from "@/packages/types/user";
import { Knex } from "knex";

export interface BillingDetails {
  line1: string;
  line2: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}
export interface Account {
  id: string;
  created_at: string;
  updated_at: string;
  sha256: string;
  stripe_membership_id: string;
  stripe_customer_id: string;
  billing_details: BillingDetails | null;
  name: string;
  username: string;
  owner_id: string | User;
}

export interface Section {
  id: string;
  account_id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
}

export interface Subscription {
  id: string;
  account_id: string;
  price_id: string;
  start_date: Date;
  renewal_date: Date;
  subscription_type: "free" | "professional" | "enterprise";
}
// accounts events
export interface SUBCreateCustomerAndAccountEvent {
  userID: string;
  event: Attribute<string>;
}

// knex table types
declare module "knex/types/tables" {
  interface Tables {
    accounts: Knex.CompositeTableType<
      Account,
      Pick<
        Account,
        | "name"
        | "owner_id"
        | "sha256"
        | "stripe_membership_id"
        | "stripe_customer_id"
        | "username"
      > &
        Partial<
          Pick<Account, "id" | "billing_details" | "created_at" | "updated_at">
        >,
      Partial<Omit<Account, "id">>
    >;
    sections: Knex.CompositeTableType<
      Section,
      Pick<Section, "title" | "description" | "icon" | "order"> &
        Partial<Pick<Section, "id" | "account_id">>,
      Partial<Omit<Section, "id">>
    >;
    subscriptions: Knex.CompositeTableType<
      Subscription,
      Pick<
        Subscription,
        "account_id" | "price_id" | "renewal_date" | "start_date"
      > &
        Partial<Pick<Subscription, "id" | "subscription_type">>,
      Partial<Omit<Subscription, "id">>
    >;
  }
}
