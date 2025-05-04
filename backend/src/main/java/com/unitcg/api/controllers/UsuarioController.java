package com.unitcg.api.controllers;

import com.amazonaws.Response;
import com.unitcg.api.domain.produto.ProdutoResponseDTO;
import com.unitcg.api.domain.usuario.Usuario;
import com.unitcg.api.domain.usuario.UsuarioRequestDTO;
import com.unitcg.api.domain.usuario.UsuarioResponseDTO;
import com.unitcg.api.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<Usuario> create (@RequestBody UsuarioRequestDTO body){
        Usuario newUsuario = this.usuarioService.createUsuario(body);
        return ResponseEntity.ok(newUsuario);
    }

    @GetMapping
    public ResponseEntity<List<UsuarioResponseDTO>> getProdutos(@RequestParam(defaultValue = "0") int page,
                                                                @RequestParam(defaultValue = "10") int size){
        List<UsuarioResponseDTO> allUsuarios = this.usuarioService.getUsuarios(page, size);
        return ResponseEntity.ok(allUsuarios);
    }

    @GetMapping(value = "/{usuarioId}")
    public ResponseEntity<UsuarioResponseDTO> getUsuario(@PathVariable UUID usuarioId){
        UsuarioResponseDTO usuario = this.usuarioService.getUsuario(usuarioId);
        return ResponseEntity.ok(usuario);
    }

    @PostMapping(value = "/delete/{usuarioId}")
    public ResponseEntity<String> removeUsuario(@PathVariable UUID usuarioId){
        this.usuarioService.deleteUsuario(usuarioId);
        return ResponseEntity.ok("Usuario excluído com sucesso");
    }
}
