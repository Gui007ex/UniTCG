package com.unitcg.api.domain.carta;

import com.unitcg.api.domain.usuario.Usuario;

import java.util.UUID;

public record CartaResponseDTO(UUID id, String name, String code, int price, String description, String imgUrl, Usuario dealer, boolean locked) {
}
