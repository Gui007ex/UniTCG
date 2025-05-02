package com.unitcg.api.domain.carta;

import com.unitcg.api.domain.usuario.Usuario;
import org.springframework.web.multipart.MultipartFile;

import java.util.Set;

public record CartaRequestDTO (String name, String code, Double price, MultipartFile image) {

}
