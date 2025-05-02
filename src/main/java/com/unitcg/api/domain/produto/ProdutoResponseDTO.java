package com.unitcg.api.domain.produto;

import com.unitcg.api.domain.usuario.Usuario;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

public record ProdutoResponseDTO(UUID id, String name, int type, String code, Double price, String imgUrl, Usuario dealer) {
}
