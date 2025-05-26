package com.unitcg.api.domain.carta;

import com.unitcg.api.domain.usuario.Usuario;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

    private String code;
    private String description;
    private String name;
    private int price;
    private String imgUrl;

    @Column(nullable = false,name = "is_locked")
    private boolean locked = false;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario dealer;
}
