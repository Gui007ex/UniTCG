CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE carta (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    code VARCHAR(30) NOT NULL,
    name VARCHAR(30) NOT NULL,
    img_url VARCHAR(100) NOT NULL,
    price FLOAT NOT NULL
);

CREATE TABLE usuario (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL
);
