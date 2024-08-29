import { Knex } from "knex";
export interface User {
  id: string;
  stripe_customer_id: string;
  user_clerk_id: string;
  username: string;
  created_at: string;
  updated_at: string;
}

// Body parameters
export interface APICreateUserBodyParameters {
  user_clerk_id: string;
  username: string;
}

// Responses
export interface APIUserResponse {
  data: { user: User };
}
export interface APIUsersResponse {
  data: { users: User[] };
}

// knex table types
declare module "knex/types/tables" {
  interface Tables {
    users: Knex.CompositeTableType<
      User,
      Pick<User, "user_clerk_id" | "username"> &
        Partial<
          Pick<User, "id" | "created_at" | "updated_at" | "stripe_customer_id">
        >,
      Partial<Omit<User, "id">>
    >;
  }
}
