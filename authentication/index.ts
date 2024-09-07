
import { Gateway } from "encore.dev/api";
import { api } from "encore.dev/api";
import { getUsersList, createUser } from "@/authentication/modules/users";
import { authenticationHandler } from "@/authentication/middlewares/authentication";

// declaring the gateway before the endpoints
export const gateway = new Gateway({ authHandler: authenticationHandler });

export const signup = api(
  { expose: true, auth: true, method: "POST", path: "/api/v1/user" },
  createUser
);

export const users = api(
  { expose: true, auth: true, method: "GET", path: "/api/v1/users" },
  getUsersList
);
