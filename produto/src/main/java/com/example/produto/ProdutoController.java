package com.example.produto;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    private final ProdutoRepository repo;

    public ProdutoController(ProdutoRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Produto> listar() {
        return repo.findAll();
    }

    @PostMapping
    public Produto criar(@RequestBody Produto produto) {
        return repo.save(produto);
    }
}
