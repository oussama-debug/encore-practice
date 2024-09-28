CREATE TYPE channel_type AS ENUM ('slack', 'telegram');

CREATE TABLE
    channels (
        id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        accountId BIGINT NOT NULL,
        userId BIGINT NOT NULL,
        type channel_type NOT NULL,
        name VARCHAR(255) NOT NULL,
        reference TEXT UNIQUE NOT NULL,
        details JSONB,
        created_at TIMESTAMP
        WITH
            TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP
        WITH
            TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

CREATE INDEX idx_channels_id ON channels (id);

CREATE INDEX idx_channels_accountId ON channels (accountId);

CREATE INDEX idx_channels_userId ON channels (userId);