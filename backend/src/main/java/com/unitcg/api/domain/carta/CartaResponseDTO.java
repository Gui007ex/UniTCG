package com.unitcg.api.domain.carta;

import java.util.UUID;

public record CartaResponseDTO(UUID id, String name, String code, String description, String imgUrl) {
}
