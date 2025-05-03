package com.unitcg.api.domain.compra;

import com.unitcg.api.domain.usuario.Usuario;

import java.util.UUID;

public record CompraRequestDTO(int price, String description, String name, String img_url, Usuario dealer) {
}
