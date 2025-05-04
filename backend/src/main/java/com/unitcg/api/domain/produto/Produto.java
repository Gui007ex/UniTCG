package com.unitcg.api.domain.produto;

import com.unitcg.api.domain.usuario.Usuario;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Table (name = "produto")
@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Produto{
    @Id
    @GeneratedValue
    private UUID id;

    private String description;
    private String name;
    private String imgUrl;
    private int price;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario dealer;
}
