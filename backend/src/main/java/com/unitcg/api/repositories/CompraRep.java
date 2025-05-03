package com.unitcg.api.repositories;

import com.unitcg.api.domain.compra.Compra;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CompraRep extends JpaRepository<Compra, UUID> {
}
