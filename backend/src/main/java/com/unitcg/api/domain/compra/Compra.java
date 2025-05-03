package com.unitcg.api.domain.compra;

import com.unitcg.api.domain.usuario.Usuario;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.UUID;

@Table(name = "compra")
@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Compra {
    @Id
    @GeneratedValue
    private UUID id;

    private int price;
    private String description;
    private String item_name;
    private String img_url;

    @CreationTimestamp
    private Timestamp date;

    @ManyToOne
    @JoinColumn(name = "dealer_id")
    private Usuario dealer;

    @ManyToOne
    @JoinColumn(name = "buyer_id")
    private Usuario buyer;
}
