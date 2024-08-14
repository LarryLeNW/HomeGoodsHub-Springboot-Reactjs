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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dao.CategoryDAO;
import com.backend.entity.Category;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor // tự ta constructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("api/admin")
public class ManageCategory {

	@Autowired
	CategoryDAO categoryDao;

	@GetMapping("/categorys")
	public List<Category> showCategory() {

		return categoryDao.findAll();

	}

	@PostMapping("/category/add")
	public Category add(@RequestBody Category category) {
	    return categoryDao.save(category);
	}
	

	@DeleteMapping("category/delete/{id}")
	public void DeleteCategory(@PathVariable("id") Integer id) {
		categoryDao.deleteById(id);
	}
	
	@PutMapping("category/update/{id}")
	public void Update(@PathVariable("id") Integer id , @RequestBody Category category) {
		 categoryDao.save(category);
	}

}
