/* Billing details:
 {
 "address": { 
 "line1": "123 Main St",
 "line2": "Apt 4B",
 "city": "Anytown",
 "state": "CA",
 "postal_code": "12345",
 "country": "US" 
 }
 }
 */
CREATE TABLE IF NOT EXISTS accounts (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    stripe_account_id TEXT NOT NULL,
    billing_details JSONB NOT NULL,
    name TEXT NOT NULL,
    owner_id UUID NOT NULL UNIQUE
);