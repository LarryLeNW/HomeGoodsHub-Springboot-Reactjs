package com.backend.util;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import config.CloudinaryConfig;
import io.github.cdimascio.dotenv.Dotenv;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class UploadFile {

	static Dotenv dotenv = Dotenv.load();
	public static Cloudinary cloudinary = new Cloudinary(dotenv.get("CLOUDINARY_URL"));

   

    public static String saveFile(MultipartFile image, String folder) {
        try {
            String uniqueFileName = UUID.randomUUID().toString() ;

            Map<String, Object> uploadParams = ObjectUtils.asMap(
                "folder", folder,
                "public_id", uniqueFileName
            );

            Map<String, Object> uploadResult = cloudinary.uploader().upload(image.getBytes(), uploadParams);
            
            return (String) uploadResult.get("url");
        } catch (IOException e) {
            throw new RuntimeException("Could not save file: " + e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException("Error during file upload: " + e.getMessage());
        }
    }
    
    public static String saveFiles(List<MultipartFile> images, String folder) {
        List<String> urls = new ArrayList();

        for (MultipartFile image : images) {
            try {
                String uniqueFileName = UUID.randomUUID().toString();

                Map<String, Object> uploadParams = ObjectUtils.asMap(
                    "folder", folder,
                    "public_id", uniqueFileName
                );

                Map<String, Object> uploadResult = cloudinary.uploader().upload(image.getBytes(), uploadParams);
                String url = (String) uploadResult.get("url");
                urls.add(url);
            } catch (IOException e) {
                throw new RuntimeException("Could not save file: " + e.getMessage());
            } catch (Exception e) {
                throw new RuntimeException("Error during file upload: " + e.getMessage());
            }
        }

        return String.join(",", urls);
    }

}
