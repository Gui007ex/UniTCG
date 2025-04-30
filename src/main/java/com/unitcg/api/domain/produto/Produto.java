package com.unitcg.api.domain.produto;

import com.unitcg.api.domain.usuario.Usuario;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;
import java.util.UUID;

@Table (name = "produto")
@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Produto {
    @Id
    @GeneratedValue
    private UUID id;
    private String name;
    private String description;

    @ManyToMany(mappedBy = "produtos")
    private Set<Usuario> usuarios;
}
