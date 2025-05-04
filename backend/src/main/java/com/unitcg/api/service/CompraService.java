package com.unitcg.api.service;

import com.unitcg.api.domain.carta.Carta;
import com.unitcg.api.domain.compra.Compra;
import com.unitcg.api.domain.compra.CompraResponseDTO;
import com.unitcg.api.domain.produto.Produto;
import com.unitcg.api.domain.usuario.Usuario;
import com.unitcg.api.repositories.CartaRep;
import com.unitcg.api.repositories.CompraRep;
import com.unitcg.api.repositories.ProdutoRep;
import com.unitcg.api.repositories.UsuarioRep;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CompraService {

    @Autowired
    private CompraRep repository;

    @Autowired
    private UsuarioRep usuarioRep;

    @Autowired
    private ProdutoRep produtoRep;

    @Autowired
    private CartaRep cartaRep;

    public Compra createCompra(UUID buyer_id, UUID item_id){

        Usuario usuario = usuarioRep.findById(buyer_id).orElseThrow(() -> new IllegalArgumentException(("Usuario não encontrado")));

        Carta carta = cartaRep.findById(item_id).orElse(null);
        Produto produto = produtoRep.findById(item_id).orElse(null);

        Compra newCompra = new Compra();
        newCompra.setBuyer(usuario);

        if (carta != null){
            newCompra.setImg_url(carta.getImgUrl());
            newCompra.setDescription(carta.getDescription());
            newCompra.setPrice(carta.getPrice());
            newCompra.setDealer(carta.getDealer());
            newCompra.setItem_name(carta.getName());
            cartaRep.delete(carta);
        }
        else if (produto != null){
            newCompra.setImg_url(produto.getImgUrl());
            newCompra.setDescription(produto.getDescription());
            newCompra.setPrice(produto.getPrice());
            newCompra.setDealer(produto.getDealer());
            newCompra.setItem_name(produto.getName());
            produtoRep.delete(produto);
        }
        else{
            throw new IllegalArgumentException("Item não encontrado");
        }

        repository.save(newCompra);

        return newCompra;
    }

    public CompraResponseDTO getCompra(UUID id){
        Compra compra = this.repository.findById(id).orElseThrow(() -> new IllegalArgumentException("Compra não encontrada"));
        return new CompraResponseDTO(compra.getId(),compra.getPrice(),compra.getDescription(),compra.getItem_name(),compra.getImg_url(),compra.getDealer(),compra.getBuyer(),compra.getDate());
    }

    public List<CompraResponseDTO> getCompras(int page, int size){
        Pageable pageable = PageRequest.of(page, size);
        Page<Compra> comprasPage = this.repository.findAll(pageable);
        return comprasPage.map(compra -> new CompraResponseDTO(compra.getId(),compra.getPrice(),compra.getDescription(),compra.getItem_name(),compra.getImg_url(),compra.getDealer(),compra.getBuyer(),compra.getDate())).stream().toList();
    }

    public void deleteCompra(UUID id){
        Compra compra = this.repository.findById(id).orElseThrow(() -> new IllegalArgumentException("Compra não encontrada"));
        repository.delete(compra);
    }
}
