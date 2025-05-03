package com.unitcg.api.service;

import com.unitcg.api.domain.usuario.Usuario;
import com.unitcg.api.domain.usuario.UsuarioRequestDTO;
import com.unitcg.api.domain.usuario.UsuarioResponseDTO;
import com.unitcg.api.repositories.UsuarioRep;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

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

    public UsuarioResponseDTO getUsuario(UUID id){
        Usuario usuario = this.repository.findById(id).orElseThrow(() -> new IllegalArgumentException("Usuario não encontrado"));
        return new UsuarioResponseDTO(usuario.getId(), usuario.getName(), usuario.getEmail());
    }

    public void deleteUsuario(UUID id){
        Usuario usuario = this.repository.findById(id).orElseThrow(() -> new IllegalArgumentException(("Usuario não encontrado")));
        repository.delete(usuario);
    }
}
