CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE produto (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    description VARCHAR(200) NOT NULL
);

CREATE TABLE usuario (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE usuario_produto (
    usuario_id UUID NOT NULL,
    produto_id UUID NOT NULL,
    quantity INT DEFAULT 1,
    acquired_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (usuario_id, produto_id),
    CONSTRAINT fk_usuario FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE,
    CONSTRAINT fk_produto FOREIGN KEY (produto_id) REFERENCES produto(id) ON DELETE CASCADE
);

CREATE INDEX idx_usuario_produto_usuario ON usuario_produto(usuario_id);
CREATE INDEX idx_usuario_produto_produto ON usuario_produto(produto_id);
