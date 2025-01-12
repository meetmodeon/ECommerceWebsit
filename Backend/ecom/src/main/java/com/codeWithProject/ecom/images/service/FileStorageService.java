package com.codeWithProject.ecom.images.service;

import com.codeWithProject.ecom.images.enitity.ImageData;
import com.codeWithProject.ecom.images.repository.ImageDataRepo;
import com.codeWithProject.ecom.images.utility.ImageUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
public class FileStorageService {

    @Autowired
    private ImageDataRepo imageDataRepo;

    public String uploadImage(MultipartFile file) throws IOException {
        ImageData result=imageDataRepo.save(ImageData.builder()
                        .name(file.getOriginalFilename())
                        .type(file.getContentType())
                        .imageData(ImageUtils.compressImage(file.getBytes()))
                .build());
        if(result != null){
            return "Saved Image in DB with name: "+file.getOriginalFilename();
        }
        return "Ohh  ..Image not save..";
    }
    public byte[] downloadImage(String fileName){
        Optional<ImageData> imageFromDb =imageDataRepo.findByName(fileName);
        byte[] imgBytes=ImageUtils.decompressImage(imageFromDb.get().getImageData());
        return imgBytes;
    }
}
