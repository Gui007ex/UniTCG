package com.unitcg.api.controllers;

import com.unitcg.api.domain.compra.Compra;
import com.unitcg.api.domain.compra.CompraResponseDTO;
import com.unitcg.api.domain.usuario.Usuario;
import com.unitcg.api.service.CompraService;
import com.unitcg.api.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/compras")
@CrossOrigin(origins = "http://localhost:5173")
public class CompraController {

    @Autowired
    private CompraService compraService;

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public ResponseEntity<List<CompraResponseDTO>> getCompras(@RequestParam(defaultValue = "0") int page,
                                                         @RequestParam(defaultValue = "10") int size){
        List<CompraResponseDTO> allCompras = this.compraService.getCompras(page, size);
        return ResponseEntity.ok(allCompras);
    }

    @PostMapping(value = "/{item_id}/{buyer_id}")
    public ResponseEntity<Compra> create (@PathVariable UUID item_id,
                                          @PathVariable UUID buyer_id){
        Compra compra = this.compraService.createCompra(buyer_id, item_id);
        return ResponseEntity.ok(compra);
    }

    @PostMapping(value = "/delete/{compraId}")
    public ResponseEntity<String> removeUsuario(@PathVariable UUID compraId){
        this.compraService.deleteCompra(compraId);
        return ResponseEntity.ok("Compra excluída com sucesso");
    }
}
