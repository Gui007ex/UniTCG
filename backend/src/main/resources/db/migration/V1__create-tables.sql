CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE usuario (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    password VARCHAR(30) NOT NULL,
    email VARCHAR(30) NOT NULL,
    number VARCHAR(30) NOT NULL
);

CREATE TABLE produto (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    description VARCHAR(500) NOT NULL,
    name VARCHAR(30) NOT NULL,
    img_url VARCHAR(500) NOT NULL,
    price INT NOT NULL,
    usuario_id UUID,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE
);

CREATE TABLE carta (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    description VARCHAR(500) NOT NULL,
    code VARCHAR(20) NOT NULL,
    img_url VARCHAR(500) NOT NULL,
    price INT NOT NULL,
    is_locked BOOLEAN DEFAULT FALSE,
    usuario_id UUID,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE
);

CREATE TABLE compra (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    price INT NOT NULL,
    date TIMESTAMP NOT NULL,
    description VARCHAR(500) NOT NULL,
    item_name VARCHAR(30) NOT NULL,
    img_url VARCHAR(500) NOT NULL,
    dealer_id UUID,
    FOREIGN KEY (dealer_id) REFERENCES usuario(id) ON DELETE CASCADE,
    buyer_id UUID,
    FOREIGN KEY (buyer_id) REFERENCES usuario(id) ON DELETE CASCADE
);