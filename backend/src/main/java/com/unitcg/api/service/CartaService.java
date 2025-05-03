package com.unitcg.api.service;

import com.amazonaws.services.s3.AmazonS3;
import com.unitcg.api.domain.carta.Carta;
import com.unitcg.api.domain.carta.CartaRequestDTO;
import com.unitcg.api.domain.carta.CartaResponseDTO;
import com.unitcg.api.domain.usuario.Usuario;
import com.unitcg.api.repositories.CartaRep;
import com.unitcg.api.repositories.UsuarioRep;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
public class CartaService {

    @Value("${aws.bucket.name}")
    private String bucketName;

    @Autowired
    private AmazonS3 s3Client;

    @Autowired
    private CartaRep repository;

    @Autowired
    private UsuarioRep usuarioRep;

    public List<CartaResponseDTO> getCartas(int page, int size){
        Pageable pageable = PageRequest.of(page, size);
        Page<Carta> cartasPage = this.repository.findAll(pageable);
        return cartasPage.map(carta -> new CartaResponseDTO(carta.getId(), carta.getName(), carta.getCode(), carta.getDescription(), carta.getImgUrl())).stream().toList();
    }

    public Carta createProduto(UUID usuarioId, CartaRequestDTO data){
        String imgUrl = null;

        if (data.image() != null){
            imgUrl = this.uploadImg(data.image());
        }

        Usuario usuario = usuarioRep.findById(usuarioId).orElseThrow(() -> new IllegalArgumentException(("Usuario não encontrado")));

        Carta newCarta = new Carta();
        newCarta.setName(data.name());
        newCarta.setCode(data.code());
        newCarta.setDescription(data.description());
        newCarta.setPrice(data.price());
        newCarta.setImgUrl(imgUrl);
        newCarta.setDealer(usuario);

        repository.save(newCarta);

        return newCarta;
    }

    private String uploadImg(MultipartFile multpartFile){
        String fileName = UUID.randomUUID() + "-" + multpartFile.getOriginalFilename();

        try{
            File file = this.convertMultipartToFile(multpartFile);
            s3Client.putObject(bucketName, fileName, file);
            file.delete();
            return s3Client.getUrl(bucketName, fileName).toString();
        }
        catch (Exception e){
            System.out.println("Erro criando arquivo");
            return "";
        }
    }

    private File convertMultipartToFile(MultipartFile multipartFile) throws IOException {
        File convFile = new File(Objects.requireNonNull(multipartFile.getOriginalFilename()));
        FileOutputStream fos = new FileOutputStream(convFile);
        fos.write(multipartFile.getBytes());
        fos.close();
        return convFile;
    }
}
