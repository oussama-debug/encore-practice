import { Attribute } from "encore.dev/pubsub";
import { Header } from "encore.dev/api";
import { Knex } from "knex";

export interface User {
  id: string;
  user_clerk_id: string;
  username: string;
  first_name: string;
  last_name: string;
  created_at: string;
  updated_at: string;
}

// Pubsub Topics
export interface TOPICAccountEvents {
  userID: string;
  user_email: string;
  user_fullname: string;
  event: Attribute<string>;
}

// Body parameters
export interface APICreateUserBodyParameters {
  user_clerk_id: string;
  username: string;
}
export interface AuthenticationPublicData extends User {
  userID: string; // a constraint from encore.dev
}

// Responses
export interface APIUserResponse {
  data: { user: User };
}
export interface APIUsersResponse {
  data: { users: User[] };
}

export interface AuthenticationHeaderParameters {
  authorization: Header<"Authorization">;
}

// knex table types
declare module "knex/types/tables" {
  interface Tables {
    users: Knex.CompositeTableType<
      User,
      Pick<User, "user_clerk_id" | "username" | "first_name" | "last_name"> &
        Partial<Pick<User, "id" | "created_at" | "updated_at">>,
      Partial<Omit<User, "id">>
    >;
  }
}
