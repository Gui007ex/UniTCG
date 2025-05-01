package com.unitcg.api.service;

import com.amazonaws.services.s3.AmazonS3;
import com.unitcg.api.domain.carta.Carta;
import com.unitcg.api.domain.carta.CartaRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.w3c.dom.events.Event;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Objects;
import java.util.UUID;

@Service
public class CartaService {

    @Value("${aws.bucket.name}")
    private String bucketName;

    @Autowired
    private AmazonS3 s3Client;

    public Carta createCard(CartaRequestDTO data){
        String imgUrl = null;

        if (data.image() != null){
            imgUrl = this.uploadImg(data.image());
        }

        Carta newCarta = new Carta();
        newCarta.setName(data.name());
        newCarta.setDescription(data.description());
        newCarta.setPrice(data.price());
        newCarta.setUsuarios(data.usuarios());
        newCarta.setImgUrl(imgUrl);

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
            return null;
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
