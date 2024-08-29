import { User } from "@/gateway/users";
import { Header } from "encore.dev/api";

export interface AuthenticationHeaderParameters {
  authorization: Header<"Authorization">;
}
export interface AuthenticationPublicData extends User {
  userID: string; // a constraint from encore.dev
}
