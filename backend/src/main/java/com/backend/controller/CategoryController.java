package com.backend.controller;


import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.backend.dao.CategoryDAO;
import com.backend.entity.Category;
import com.backend.util.UploadFile;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/api/category")
public class CategoryController {

    @Autowired
    CategoryDAO categoryDao;
    

    @GetMapping("")
    public ResponseEntity<?> getCategories(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "8") int pageSize,
            @RequestParam(required = false, defaultValue = "") String keywords,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false, defaultValue = "asc") String sortOrder) {

        try {
            Pageable pageable;

            if (sortBy != null && !sortBy.isEmpty()) {
                Sort.Direction direction = "desc".equalsIgnoreCase(sortOrder) ? Sort.Direction.DESC : Sort.Direction.ASC;
                Sort sort = Sort.by(direction, sortBy);
                pageable = PageRequest.of(page, pageSize, sort);
            } else {
                pageable = PageRequest.of(page, pageSize);
            }

            Page<Category> itemPage = categoryDao.findAllByNameLike("%" + keywords + "%", pageable);

            return ResponseEntity.ok(itemPage);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping("")
    public ResponseEntity<?> createCategory(
            @RequestParam("name") String name,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) MultipartFile image) {

        if (name == null || name.trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing required parameter: name");
        }

        try {
            Category category = new Category();
            category.setName(name);
            category.setDescription(description);

            if (image != null && !image.isEmpty()) {
            	category.setThumb(UploadFile.saveFile(image , "category"));
            }

            Category savedCategory = categoryDao.save(category);

            return ResponseEntity.status(HttpStatus.CREATED).body(savedCategory);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Integer id) {
        try {
            // Kiểm tra sự tồn tại của category
            if (!categoryDao.existsById(id)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Category not found with id: " + id);
            }

            // Xóa category
            categoryDao.deleteById(id);

            return ResponseEntity.ok("Deleted successfully"); // Trả về trạng thái 204 No Content
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCategory(
            @PathVariable Integer id,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) MultipartFile image) {

        try {
            Category category = categoryDao.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("Category not found with id: " + id));

            if (name != null && !name.trim().isEmpty()) {
                category.setName(name);
            }
            if (description != null) {
                category.setDescription(description);
            }
            if (image != null && !image.isEmpty()) {
                category.setThumb(UploadFile.saveFile(image, "category"));
            }

            Category updatedCategory = categoryDao.save(category);

            return ResponseEntity.ok(updatedCategory);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    
    
}
