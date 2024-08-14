package com.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dao.MailerService;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/api/user/")
public class SendMailController {
	
	@Autowired
	MailerService maildao;
      
	@PostMapping("/sendMail/{email}")
	public ResponseEntity<?> SendMail(@PathVariable String email){
		
		try {
			maildao.send(email,"Thư gửi ĐĂNG KÝ NHẬN BẢN TIN ","Hello");
			return ResponseEntity.ok("gửi mail thành công");
		} catch (Exception e) { 
			// TODO: handle exception
			System.out.println("Lỗi gửi mail" +e);
		}
		return null;
		
	}
	
}
