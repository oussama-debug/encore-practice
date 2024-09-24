import { Gateway } from "encore.dev/api";
import { api } from "encore.dev/api";
import {
  getUsersList,
  createUser,
  getUser,
} from "@/authentication/modules/users";
import { authenticationHandler } from "@/authentication/middlewares/authentication";
import {
  APICreateUserBodyParameters,
  APIUserResponse,
} from "@/packages/types/user";

// declaring the gateway before the endpoints
export const gateway = new Gateway({ authHandler: authenticationHandler });

export const signup = api(
  { expose: true, auth: true, method: "POST", path: "/api/v1/setup" },
  async (parameters: APICreateUserBodyParameters): Promise<APIUserResponse> =>
    createUser(parameters)
);

export const user = api(
  { expose: true, auth: true, method: "GET", path: "/api/v1/user" },
  getUser
);

export const users = api(
  { expose: true, auth: true, method: "GET", path: "/api/v1/users" },
  getUsersList
);
