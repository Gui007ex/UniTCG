package com.unitcg.api.service;

import com.amazonaws.services.s3.AmazonS3;
import com.unitcg.api.domain.produto.Produto;
import com.unitcg.api.domain.produto.ProdutoRequestDTO;
import com.unitcg.api.domain.usuario.Usuario;
import com.unitcg.api.repositories.ProdutoRep;
import com.unitcg.api.repositories.UsuarioRep;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Objects;
import java.util.UUID;

@Service
public class ProdutoService {

    @Value("${aws.bucket.name}")
    private String bucketName;

    @Autowired
    private AmazonS3 s3Client;

    @Autowired
    private ProdutoRep repository;

    @Autowired
    private UsuarioRep usuarioRep;

    public Produto createProduto(UUID usuarioId, ProdutoRequestDTO data){
        String imgUrl = null;

        if (data.image() != null){
            imgUrl = this.uploadImg(data.image());
        }

        Usuario usuario = usuarioRep.findById(usuarioId).orElseThrow(() -> new IllegalArgumentException(("Usuario não encontrado")));

        Produto newProduto = new Produto();
        newProduto.setName(data.name());
        newProduto.setType(data.type());
        newProduto.setCode(data.code());
        newProduto.setPrice(data.price());
        newProduto.setImgUrl(imgUrl);
        newProduto.setDealer(usuario);

        repository.save(newProduto);

        return newProduto;
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
