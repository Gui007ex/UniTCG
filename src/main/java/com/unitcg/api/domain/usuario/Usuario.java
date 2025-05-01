package com.unitcg.api.domain.usuario;

import com.unitcg.api.domain.carta.Carta;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;
import java.util.UUID;

@Table (name = "usuario")
@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {
    @Id
    @GeneratedValue
    private UUID id;
    private String name;
    private String password;

    @ManyToMany
    @JoinTable(
            name = "usuario_carta",
            joinColumns = @JoinColumn(name = "usuario_id"),
            inverseJoinColumns = @JoinColumn(name = "carta_id")
    )
    private Set<Carta> cartas;
}
