package com.unitcg.api.domain.compra;

import com.unitcg.api.domain.usuario.Usuario;

import java.util.UUID;

public record CompraRequestDTO(UUID item_id, Usuario buyer) {
}
