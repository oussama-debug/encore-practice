import { api, APIError } from "encore.dev/api";
import { databaseClient, databaseORM } from "@/gateway/index";
import {
  User,
  APIUsersResponse,
  APICreateUserBodyParameters,
  APIUserResponse,
} from "@/gateway/common/users";

export const signup = api(
  { expose: true, auth: false, method: "POST", path: "/api/v1/user" },
  async (parameters: APICreateUserBodyParameters): Promise<APIUserResponse> => {
    const userFindOneByUsernameORClerkId = await databaseORM
      .select("*")
      .from("users")
      .where("user_clerk_id", parameters.user_clerk_id)
      .orWhere("username", parameters.username)
      .first();

    // if user exists under same username or clerk id
    if (userFindOneByUsernameORClerkId)
      APIError.alreadyExists(
        `User with id -> ${parameters.user_clerk_id} already exists`
      );

    // saving user and returning all fields
    const user = await databaseORM("users")
      .insert({
        user_clerk_id: parameters.user_clerk_id,
        username: parameters.username,
      })
      .returning("*");

    return { data: { user: user[0] } };
  }
);

export const users = api(
  { expose: true, auth: true, method: "GET", path: "/api/v1/users" },
  async (): Promise<APIUsersResponse> => {
    const users = await databaseORM.select("*").from("users");

    return { data: { users } };
  }
);
