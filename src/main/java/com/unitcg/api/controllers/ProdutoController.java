package com.unitcg.api.controllers;

import com.unitcg.api.domain.produto.Produto;
import com.unitcg.api.domain.produto.ProdutoRequestDTO;
import com.unitcg.api.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@RestController
@RequestMapping("/api/produto")
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    @PostMapping (value = "/usuario/{usuario_id}" , consumes = "multipart/form-data")
    public ResponseEntity<Produto> create(@PathVariable UUID usuarioId,
                                          @RequestParam("name") String name,
                                          @RequestParam("type") int type,
                                          @RequestParam("code") String code,
                                          @RequestParam("price") Double price,
                                          @RequestParam(value= "image", required = false) MultipartFile image){
        ProdutoRequestDTO produtoRequestDTO = new ProdutoRequestDTO(name, type, code, price, image);
        Produto newProduto = this.produtoService.createProduto(usuarioId, produtoRequestDTO);
        return ResponseEntity.ok(newProduto);
    }
}
