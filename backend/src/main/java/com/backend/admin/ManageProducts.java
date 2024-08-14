package com.backend.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dao.CategoryDAO;
import com.backend.dao.ProductDAO;
import com.backend.entity.Category;
import com.backend.entity.Product;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor // tự tao constructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("api/admin")
public class ManageProducts {

	@Autowired
	ProductDAO productDao;
	@Autowired
	CategoryDAO categoryDao;

	@GetMapping("/products")
	public List<Product> showProduct() {

		return productDao.findAll();

	}

	@PostMapping("products/add")
	public Product addProduct(@RequestBody Product product) {

		return productDao.save(product);
	}

	@GetMapping("cbxCategorys")
	public List<Category> showComBoBoxCategory() {
		return categoryDao.findAll();
	}

	@DeleteMapping("/products/delete/{productId}")
	public void DeleteProduct(@PathVariable("productId") Integer productId) {
		productDao.deleteById(productId);
	}
	@PutMapping("/products/update/{productId}")
	public void Update(@PathVariable("productId") Integer productId , @RequestBody Product product) {
		 productDao.save(product);
	}

}
