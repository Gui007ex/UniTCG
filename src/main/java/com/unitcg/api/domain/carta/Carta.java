package com.unitcg.api.domain.carta;

import com.unitcg.api.domain.usuario.Usuario;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;
import java.util.UUID;

@Table (name = "carta")
@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Carta {
    @Id
    @GeneratedValue
    private UUID id;
    private String name;
    private String description;
    private String imgUrl;
    private Double price;

    @ManyToMany(mappedBy = "cartas")
    private Set<Usuario> usuarios;
}
