package com.unitcg.api.service;

import com.unitcg.api.domain.usuario.Usuario;
import com.unitcg.api.domain.usuario.UsuarioRequestDTO;
import com.unitcg.api.repositories.UsuarioRep;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRep repository;

    public Usuario createUsuario(UsuarioRequestDTO usuarioData){
        Usuario usuario = new Usuario();
        usuario.setName(usuarioData.name());
        usuario.setPassword(usuarioData.password());
        usuario.setEmail(usuarioData.email());

        repository.save(usuario);

        return usuario;
    }
}
