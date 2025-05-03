package com.unitcg.api.domain.compra;

import com.unitcg.api.domain.usuario.Usuario;

import java.sql.Timestamp;
import java.util.UUID;

public record CompraResponseDTO(UUID id, int price, String description, String item_name, String img_url, Usuario dealer_id, Usuario buyer_id, Timestamp date) {
}
