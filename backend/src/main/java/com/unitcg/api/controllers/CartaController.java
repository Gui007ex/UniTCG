package com.unitcg.api.controllers;

import com.unitcg.api.domain.carta.Carta;
import com.unitcg.api.domain.carta.CartaRequestDTO;
import com.unitcg.api.domain.carta.CartaResponseDTO;
import com.unitcg.api.service.CartaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/carta")
@CrossOrigin(origins = "http://localhost:5173")
public class CartaController {

    @Autowired
    private CartaService cartaService;

    @PostMapping(value = "/usuario/{usuarioId}" , consumes = "multipart/form-data")
    public ResponseEntity<Carta> create(@PathVariable UUID usuarioId,
                                        @RequestParam("name") String name,
                                        @RequestParam("code") String code,
                                        @RequestParam("description") String description,
                                        @RequestParam("price") int price,
                                        @RequestParam(value= "image", required = false) MultipartFile image){
        CartaRequestDTO produtoRequestDTO = new CartaRequestDTO(name, code, description, price, image);
        Carta newProduto = this.cartaService.createProduto(usuarioId, produtoRequestDTO);
        return ResponseEntity.ok(newProduto);
    }

    @GetMapping
    public ResponseEntity<List<CartaResponseDTO>> getProdutos(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size){
        List<CartaResponseDTO> allProdutos = this.cartaService.getCartas(page, size);
        return ResponseEntity.ok(allProdutos);
    }

    @PostMapping(value = "/delete/{cartaId}")
    public ResponseEntity<String> removeUsuario(@PathVariable UUID cartaId){
        this.cartaService.deleteCarta(cartaId);
        return ResponseEntity.ok("Carta excluída com sucesso");
    }
}