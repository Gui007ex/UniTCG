package com.unitcg.api.repositories;

import com.unitcg.api.domain.carta.Carta;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CartaRep extends JpaRepository<Carta, UUID> {
}
