package com.unitcg.api.repositories;

import com.unitcg.api.domain.produto.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ProdutoRep extends JpaRepository<Produto, UUID> {
}
