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
  stripe_account_id: string;
  billing_details: BillingDetails | null;
  name: string;
  owner_id: string | User;
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
      Pick<Account, "name" | "owner_id" | "sha256" | "stripe_account_id"> &
        Partial<
          Pick<Account, "id" | "billing_details" | "created_at" | "updated_at">
        >,
      Partial<Omit<Account, "id">>
    >;
  }
}
