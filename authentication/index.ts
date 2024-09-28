import { Gateway } from "encore.dev/api";
import { api } from "encore.dev/api";
import { createUser, getUser } from "@/authentication/modules/users";
import { authenticationHandler } from "@/authentication/middlewares/authentication";
import {
  APICreateUserBodyParameters,
  APIUserResponse,
} from "@/packages/types/user";

// declaring the gateway before the endpoints
export const gateway = new Gateway({ authHandler: authenticationHandler });

// authentication
export const signup = api(
  { expose: true, auth: true, method: "POST", path: "/api/v1/setup" },
  async (parameters: APICreateUserBodyParameters): Promise<APIUserResponse> =>
    createUser(parameters)
);
export const user_ = api(
  { expose: true, auth: true, method: "GET", path: "/api/v1/user" },
  async (): Promise<APIUserResponse> => getUser()
);

// store
export const get_store = api(
  { expose: true, auth: true, method: "GET", path: "/api/v1/store" },
  async () => {}
);
export const create_store = api(
  { expose: true, auth: true, method: "POST", path: "/api/v1/store" },
  async () => {}
);

// oauth requests
export const oauth_slack = api(
  { expose: true, auth: true, method: "GET", path: "/api/v1/connect/slack" },
  async () => {}
);

// oauth callbacks
export const oauth_callback = api(
  { expose: true, auth: true, method: "POST", path: "/api/v1/callback/slack" },
  async () => {}
);
