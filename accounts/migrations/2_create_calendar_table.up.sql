ALTER TABLE accounts
ADD COLUMN description TEXT;

ALTER TABLE accounts
ADD COLUMN logo TEXT;

ALTER TABLE accounts
ADD COLUMN title TEXT;

ALTER TABLE accounts
ADD COLUMN published BOOLEAN NOT NULL DEFAULT FALSE;

-- Create sections table
CREATE TABLE
    sections (
        id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        account_id BIGINT NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        icon TEXT,
        "order" INTEGER NOT NULL,
        CONSTRAINT fk_account FOREIGN KEY (account_id) REFERENCES accounts (id) ON DELETE CASCADE
    );

-- Create index on accountId for better query performance
CREATE INDEX idx_sections_accountId ON sections (account_id);