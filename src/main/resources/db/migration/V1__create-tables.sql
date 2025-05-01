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

CREATE TABLE usuario_carta (
    usuario_id UUID NOT NULL,
    carta_id UUID NOT NULL,
    quantity INT DEFAULT 1,
    acquired_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (usuario_id, carta_id),
    CONSTRAINT fk_usuario FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE,
    CONSTRAINT fk_carta FOREIGN KEY (carta_id) REFERENCES carta(id) ON DELETE CASCADE
);

CREATE INDEX idx_usuario_carta_usuario ON usuario_carta(usuario_id);
CREATE INDEX idx_usuario_carta_carta ON usuario_carta(carta_id);
