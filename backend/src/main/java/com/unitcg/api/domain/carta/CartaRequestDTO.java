package com.unitcg.api.domain.carta;

import org.springframework.web.multipart.MultipartFile;

public record CartaRequestDTO(String name, String code, String description, int price, MultipartFile image) {
}
