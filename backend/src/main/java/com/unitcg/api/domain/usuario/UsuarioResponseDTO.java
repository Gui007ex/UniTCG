package com.unitcg.api.domain.usuario;

import java.util.UUID;

public record UsuarioResponseDTO(UUID id, String name, String email) {
}
