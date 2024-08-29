import { api } from "encore.dev/api";
import { databaseClient } from "@/gateway/index";
import { User, APIUsersResponse } from "@/gateway/common/users";

export const users = api(
  { expose: true, auth: true, method: "GET", path: "/api/v1/users" },
  async (): Promise<APIUsersResponse> => {
    let users: User[] = [];
    const rows = databaseClient.query`
      SELECT id, stripe_customer_id, user_clerk_id, created_at, updated_at
      FROM users
    `;

    for await (const row of rows) {
      users.push({
        id: row.id,
        stripe_customer_id: row.stripe_customer_id,
        user_clerk_id: row.user_clerk_id,
        updated_at: row.updated_at,
        created_at: row.created_at,
      });
    }

    return { data: { users } };
  }
);
