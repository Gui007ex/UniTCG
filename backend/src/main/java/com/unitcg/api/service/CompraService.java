package com.unitcg.api.service;

import com.unitcg.api.domain.compra.Compra;
import com.unitcg.api.domain.compra.CompraRequestDTO;
import com.unitcg.api.domain.compra.CompraResponseDTO;
import com.unitcg.api.domain.usuario.Usuario;
import com.unitcg.api.repositories.CompraRep;
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

    public Compra createCompra(UUID buyer_id, CompraRequestDTO data){

        Usuario usuario = usuarioRep.findById(buyer_id).orElseThrow(() -> new IllegalArgumentException(("Usuario não encontrado")));

        Compra newCompra = new Compra();
        newCompra.setBuyer(usuario);
        newCompra.setDealer(data.dealer());
        newCompra.setItem_name(data.name());
        newCompra.setDescription(data.description());
        newCompra.setPrice(data.price());
        newCompra.setImg_url(data.img_url());

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
}
