package com.unitcg.api.domain.produto;

import org.springframework.web.multipart.MultipartFile;

public record ProdutoRequestDTO(String name, String description, int price, MultipartFile image) {

}
