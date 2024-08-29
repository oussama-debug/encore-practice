import { api, APIError } from "encore.dev/api";
import { databaseClient } from "@/gateway/index";
import {
  User,
  APIUsersResponse,
  APICreateUserBodyParameters,
  APIUserResponse,
} from "@/gateway/common/users";

export const signup = api(
  { expose: true, auth: false, method: "POST", path: "/api/v1/user" },
  async (parameters: APICreateUserBodyParameters): Promise<APIUserResponse> => {
    const ifUserExist = databaseClient.query`
    SELECT id, stripe_customer_id, user_clerk_id, created_at, updated_at
    FROM users
    WHERE user_clerk_id = ${parameters.user_clerk_id} OR username = ${parameters.username}
    LIMIT 1
  `;

    if (ifUserExist)
      APIError.alreadyExists(
        `User with id -> ${parameters.user_clerk_id} already exists`
      );

    await databaseClient.exec`INSERT INTO users(user_clerk_id, username) VALUES(${parameters.user_clerk_id},${parameters.username})`;

    const rows = databaseClient.query`
      SELECT id, stripe_customer_id, user_clerk_id, username, created_at, updated_at
      FROM users
      WHERE user_clerk_id = ${parameters.user_clerk_id}
      LIMIT 1
    `;

    let users: User[] = [];
    for await (const row of rows) {
      users.push({
        id: row.id,
        stripe_customer_id: row.stripe_customer_id,
        user_clerk_id: row.user_clerk_id,
        updated_at: row.updated_at,
        created_at: row.created_at,
        username: row.username,
      });
    }

    // if no user was found
    if (users.length <= 0)
      APIError.notFound(
        `User with id -> ${parameters.user_clerk_id} was not found`
      );

    return { data: { user: users[0] } };
  }
);

export const users = api(
  { expose: true, auth: true, method: "GET", path: "/api/v1/users" },
  async (): Promise<APIUsersResponse> => {
    const rows = databaseClient.query`
      SELECT id, stripe_customer_id, username, user_clerk_id, created_at, updated_at
      FROM users
    `;

    let users: User[] = [];
    for await (const row of rows) {
      users.push({
        id: row.id,
        stripe_customer_id: row.stripe_customer_id,
        user_clerk_id: row.user_clerk_id,
        updated_at: row.updated_at,
        created_at: row.created_at,
        username: row.username,
      });
    }

    return { data: { users } };
  }
);
