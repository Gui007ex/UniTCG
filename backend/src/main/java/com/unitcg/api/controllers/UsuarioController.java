package com.unitcg.api.controllers;

import com.amazonaws.Response;
import com.unitcg.api.domain.usuario.Usuario;
import com.unitcg.api.domain.usuario.UsuarioRequestDTO;
import com.unitcg.api.domain.usuario.UsuarioResponseDTO;
import com.unitcg.api.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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


    @GetMapping(value = "/{usuarioId}")
    public ResponseEntity<UsuarioResponseDTO> getUsuario(@PathVariable UUID usuarioId){
        UsuarioResponseDTO usuario = this.usuarioService.getUsuario(usuarioId);
        return ResponseEntity.ok(usuario);
    }
}
