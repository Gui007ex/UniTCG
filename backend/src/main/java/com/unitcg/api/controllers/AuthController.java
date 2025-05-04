package com.unitcg.api.controllers;

import com.unitcg.api.domain.usuario.LoginDTO;
import com.unitcg.api.domain.usuario.Usuario;
import com.unitcg.api.repositories.UsuarioRep;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
    private final UsuarioRep usuarioRep;

    public AuthController(UsuarioRep usuarioRep) {
        this.usuarioRep = usuarioRep;
    }

    @PostMapping("/login")
    public ResponseEntity<Usuario> login(@RequestBody LoginDTO loginRequest) {
        String usernameOrEmail = loginRequest.getUsernameOrEmail();
        String password = loginRequest.getPassword();

        Optional<Usuario> optionalUsuario = usuarioRep.findByEmail(usernameOrEmail);

        if (optionalUsuario.isEmpty()) {
            optionalUsuario = usuarioRep.findByName(usernameOrEmail);
        }

        if (optionalUsuario.isPresent()) {
            Usuario usuario = optionalUsuario.get();

            if (usuario.getPassword().equals(password)) {
                // Login bem-sucedido (retorna os dados do usuário)
                return ResponseEntity.ok(usuario);
            }
        }
        // Credenciais inválidas
        return ResponseEntity.status(401).build();
    }
}
