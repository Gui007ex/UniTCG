package com.unitcg.api.controllers;

import com.unitcg.api.domain.carta.Carta;
import com.unitcg.api.domain.carta.CartaRequestDTO;
import com.unitcg.api.service.CartaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/carta")
public class CartaController {

    @Autowired
    private CartaService cartaService;

    @PostMapping (consumes = "multipart/form-data")
    public ResponseEntity<Carta> create(@RequestParam("name") String name,
                                        @RequestParam("code") String code,
                                        @RequestParam("price") Double price,
                                        @RequestParam(value= "image", required = false) MultipartFile image){
        CartaRequestDTO cartaRequestDTO = new CartaRequestDTO(name, code, price, image);
        Carta newCarta = this.cartaService.createCard(cartaRequestDTO);
        return ResponseEntity.ok(newCarta);
    }
}
