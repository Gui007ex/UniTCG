package com.unitcg.api.domain.produto;

import com.unitcg.api.domain.usuario.Usuario;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

public record ProdutoResponseDTO(UUID id, String name, String description, int price, String imgUrl, Usuario dealer) {
}
