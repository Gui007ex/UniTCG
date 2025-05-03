package com.unitcg.api.controllers;

import com.amazonaws.Response;
import com.unitcg.api.domain.usuario.Usuario;
import com.unitcg.api.domain.usuario.UsuarioRequestDTO;
import com.unitcg.api.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
