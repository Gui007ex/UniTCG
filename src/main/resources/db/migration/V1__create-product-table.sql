CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE produto (
    id UUID get_random_UUID() PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    description VARCHAR(200) NOT NULL
);