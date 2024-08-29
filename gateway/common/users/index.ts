export interface User {
  id: string;
  stripe_customer_id: string;
  user_clerk_id: string;
  created_at: string;
  updated_at: string;
}

export interface APIUsersResponse {
  data: { users: User[] };
}
