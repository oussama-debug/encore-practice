-- Create subscriptions table
CREATE TYPE subscription_type AS ENUM ('free', 'professional', 'enterprise');

CREATE TABLE
    subscriptions (
        id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        account_id BIGINT NOT NULL,
        price_id VARCHAR(255) NOT NULL,
        start_date TIMESTAMP NOT NULL,
        renewal_date TIMESTAMP NOT NULL,
        subscription_type subscription_type NOT NULL DEFAULT 'free',
        CONSTRAINT fk_account FOREIGN KEY (account_id) REFERENCES accounts (id) ON DELETE CASCADE
    );

-- Create index on accountId for better query performance
CREATE INDEX idx_subscriptions_accountId ON subscriptions (account_id);