package com.unitcg.api.service;

import com.unitcg.api.domain.usuario.Usuario;
import com.unitcg.api.domain.usuario.UsuarioRequestDTO;
import com.unitcg.api.domain.usuario.UsuarioResponseDTO;
import com.unitcg.api.repositories.UsuarioRep;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
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
        usuario.setNumber(usuarioData.number());

        repository.save(usuario);

        return usuario;
    }

    public UsuarioResponseDTO getUsuario(UUID id){
        Usuario usuario = this.repository.findById(id).orElseThrow(() -> new IllegalArgumentException("Usuario não encontrado"));
        return new UsuarioResponseDTO(usuario.getId(), usuario.getName(), usuario.getEmail(), usuario.getPassword(), usuario.getNumber());
    }

    public List<UsuarioResponseDTO> getUsuarios(int page, int size){
        Pageable pageable = PageRequest.of(page, size);
        Page<Usuario> usuariosPage = this.repository.findAll(pageable);
        return usuariosPage.map(usuario -> new UsuarioResponseDTO(usuario.getId(), usuario.getName(), usuario.getEmail(), usuario.getPassword(), usuario.getNumber())).stream().toList();
    }

    public void deleteUsuario(UUID id){
        Usuario usuario = this.repository.findById(id).orElseThrow(() -> new IllegalArgumentException(("Usuario não encontrado")));
        repository.delete(usuario);
    }
}
