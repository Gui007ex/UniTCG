package com.unitcg.api.repositories;

import com.unitcg.api.domain.usuario.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UsuarioRep extends JpaRepository<Usuario, UUID> {
}
