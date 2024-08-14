package com.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;

import com.cloudinary.Cloudinary;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
@RestController
public class BackendApplication {

	
	
	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
		Dotenv dotenv = Dotenv.load();
		Cloudinary cloudinary = new Cloudinary(dotenv.get("CLOUDINARY_URL"));
		cloudinary.config.secure = true;
		System.out.println(cloudinary.config.cloudName);
	}
	
	

	@GetMapping("/")
	@ResponseBody
	public String index() {
		return "<h1> Hello world </h1>";
	}
	
}
