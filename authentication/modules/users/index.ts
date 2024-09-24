import { databaseORM } from "@/authentication/configuration";
import {
  type APICreateUserBodyParameters,
  type APIUserResponse,
  type User,
} from "@/packages/types/user";
import { APIError } from "encore.dev/api";
import { clerkClient } from "@/authentication/middlewares/authentication";
import { TOPICPaymentsAccount } from "@/packages/topics/accounts/payments";
import { getAuthData } from "~encore/auth";

export async function getUser(): Promise<APIUserResponse> {
  const auth = getAuthData();
  // user already setup
  if (auth && auth.user_clerk_id) {
    const userFindOneByUsernameORClerkId = await databaseORM("users")
      .select("*")
      .where("user_clerk_id", auth.id)
      .orWhere("username", auth.username)
      .first();

    return { data: { user: userFindOneByUsernameORClerkId! } };
  }
  return { data: { user: null } };
}

export async function createUser(
  parameters: APICreateUserBodyParameters
): Promise<APIUserResponse> {
  const userFindOneByUsernameORClerkId = await databaseORM("users")
    .select("*")
    .where("user_clerk_id", parameters.user_clerk_id)
    .orWhere("username", parameters.username)
    .first();

  // if user exists under same username or clerk id
  if (userFindOneByUsernameORClerkId)
    throw APIError.alreadyExists(
      `User with id -> ${parameters.user_clerk_id} or username -> ${parameters.username} already exists`
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

  // publish user to payments account
  await TOPICPaymentsAccount.publish({
    userID: user[0].id!,
    user_email: clerkUser.primaryEmailAddress?.emailAddress!,
    user_fullname: `${clerkUser.firstName} ${clerkUser.lastName}`,
    event: "create-payments-account",
  });

  return { data: { user: user[0] } };
}
