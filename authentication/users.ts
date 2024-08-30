import { api, APIError } from "encore.dev/api";
import { clerkClient, databaseORM } from "@/authentication/index";
import {
  APIUsersResponse,
  APICreateUserBodyParameters,
  APIUserResponse,
} from "@/packages/types/user";
import { TOPICPaymentsAccount } from "@/packages/topics/accounts/payments";

export const signup = api(
  { expose: true, auth: false, method: "POST", path: "/api/v1/user" },
  async (parameters: APICreateUserBodyParameters): Promise<APIUserResponse> => {
    const userFindOneByUsernameORClerkId = await databaseORM("users")
      .select("*")
      .where("user_clerk_id", parameters.user_clerk_id)
      .orWhere("username", parameters.username)
      .first();

    // if user exists under same username or clerk id
    if (userFindOneByUsernameORClerkId)
      APIError.alreadyExists(
        `User with id -> ${parameters.user_clerk_id} already exists`
      );

    const clerkUser = await clerkClient.users.getUser(parameters.user_clerk_id);

    // saving user and returning all fields
    const user = await databaseORM("users")
      .insert({
        user_clerk_id: parameters.user_clerk_id,
        username: parameters.username,
        first_name: clerkUser.firstName!,
        last_name: clerkUser.lastName!,
      })
      .returning("*");

    // getting user data

    await TOPICPaymentsAccount.publish({
      userID: user[0].id!,
      user_email: clerkUser.primaryEmailAddress?.emailAddress!,
      user_fullname: `${clerkUser.firstName} ${clerkUser.lastName}`,
      event: "create-payments-account",
    });

    return { data: { user: user[0] } };
  }
);

export const users = api(
  { expose: true, auth: true, method: "GET", path: "/api/v1/users" },
  async (): Promise<APIUsersResponse> => {
    const users = await databaseORM("users").select("*");
    return { data: { users } };
  }
);
