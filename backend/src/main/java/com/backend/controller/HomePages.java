package com.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;

import com.backend.dao.CategoryDAO;
import com.backend.dao.ProductDAO;
import com.backend.entity.Category;
import com.backend.entity.Product;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor // tự ta constructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class HomePages {
	@Autowired
	ProductDAO productDao;
	@Autowired
	CategoryDAO categorydao;

	@GetMapping("api/user/homepage")
	public Page<Product> getProducts(@RequestParam int page, @RequestParam int pageSize) {
		return productDao.findAll(PageRequest.of(page, pageSize));
	}

//	@GetMapping("api/user/showProductByCategory/{categoryId}")
//	public ResponseEntity<List<Product>> getAllProductByCategory(@PathVariable Integer categoryId){
//		List<Product> product = productDao.findByCategoryCategoryId(categoryId);
//		return ResponseEntity.ok(product);
//	}
	@GetMapping("api/user/showCategory")
	public ResponseEntity<List<Category>> getAllCategory(){
		List<Category> item  = categorydao.findAll();
		return ResponseEntity.ok(item);
	}

}
