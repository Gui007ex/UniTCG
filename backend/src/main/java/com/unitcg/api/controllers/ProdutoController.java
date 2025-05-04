package com.unitcg.api.controllers;

import com.unitcg.api.domain.produto.Produto;
import com.unitcg.api.domain.produto.ProdutoRequestDTO;
import com.unitcg.api.domain.produto.ProdutoResponseDTO;
import com.unitcg.api.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/produto")
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    @PostMapping (value = "/usuario/{usuarioId}" , consumes = "multipart/form-data")
    public ResponseEntity<Produto> create(@PathVariable UUID usuarioId,
                                          @RequestParam("name") String name,
                                          @RequestParam("description") String description,
                                          @RequestParam("price") int price,
                                          @RequestParam(value= "image", required = false) MultipartFile image){
        ProdutoRequestDTO produtoRequestDTO = new ProdutoRequestDTO(name, description, price, image);
        Produto newProduto = this.produtoService.createProduto(usuarioId, produtoRequestDTO);
        return ResponseEntity.ok(newProduto);
    }

    @GetMapping
    public ResponseEntity<List<ProdutoResponseDTO>> getProdutos(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size){
        List<ProdutoResponseDTO> allProdutos = this.produtoService.getProdutos(page, size);
        return ResponseEntity.ok(allProdutos);
    }

    @PostMapping(value = "/delete/{produtoId}")
    public ResponseEntity<String> removeUsuario(@PathVariable UUID produtoId){
        this.produtoService.deleteProduto(produtoId);
        return ResponseEntity.ok("Produto excluído com sucesso");
    }
}
