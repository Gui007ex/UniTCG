package com.unitcg.api.domain.produto;

import org.springframework.web.multipart.MultipartFile;

public record ProdutoRequestDTO(String name, int type, String code, Double price, MultipartFile image) {

}
