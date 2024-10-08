package com.backend.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.backend.dao.CategoryDAO;
import com.backend.dao.ProductDAO;
import com.backend.entity.Category;
import com.backend.entity.Product;
import com.backend.util.UploadFile;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/api")
public class ProductController {

	@Autowired
	ProductDAO productDAO;

	@Autowired
	CategoryDAO categoryDAO;

	@GetMapping("/product")
	public ResponseEntity<?> get(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "9") int limit,
			@RequestParam(required = false, defaultValue = "") String keywords,
			@RequestParam(required = false) String sortBy,
			@RequestParam(required = false, defaultValue = "asc") String sortOrder,
			@RequestParam(required = false) String category , 
			@RequestParam(required = false, defaultValue = "0") Integer minPrice, 
			@RequestParam(required = false) Integer maxPrice) {

		try {
			Pageable pageable;

			if (sortBy != null && !sortBy.isEmpty()) {
				Sort.Direction direction = "desc".equalsIgnoreCase(sortOrder) ? Sort.Direction.DESC
						: Sort.Direction.ASC;
				Sort sort = Sort.by(direction, sortBy);
				pageable = PageRequest.of(page - 1 , limit, sort);
			} else {
				pageable = PageRequest.of(page - 1, limit);
			}

			Page<Product> itemPage;
			if (category != null && !category.isEmpty()) {
				itemPage = productDAO.findByNameLikeAndCategoryNameLike("%" + keywords + "%", "%" + category + "%",
						pageable);
			}else if(minPrice != null && maxPrice != null) {
				itemPage = productDAO.findByunitPriceBetween(minPrice , maxPrice,
						pageable);
			}
			else {
				itemPage = productDAO.findAllByNameLike("%" + keywords + "%", pageable);
			}

			return ResponseEntity.ok(itemPage);
		} catch (Exception e) {
			e.printStackTrace(); 
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}
	
	@GetMapping("/product/{id}")
	public ResponseEntity<?> getOne(@PathVariable Integer id) {

		try {
			Optional<Product> optionalProduct = productDAO.findById(id);
			if (!optionalProduct.isPresent()) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
			}

			return ResponseEntity.ok(optionalProduct.get());
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}
	

	@PostMapping("/admin/product")
	public ResponseEntity<?> create(@RequestParam String name, @RequestParam Integer quantity,
			@RequestParam double unitPrice, @RequestParam String description, @RequestParam Integer discount,
			@RequestParam Integer categoryId, @RequestParam(required = false) MultipartFile thumb,
			@RequestParam(required = false) List<MultipartFile> images) {

		try {

			Category category = categoryDAO.findById(categoryId)
					.orElseThrow(() -> new IllegalArgumentException("Invalid category ID: " + categoryId));

			Product product = new Product();
			product.setName(name);
			product.setQuantity(quantity);
			product.setUnitPrice(unitPrice);
			product.setDescription(description);
			product.setDiscount(discount);
			product.setCategory(category);

			if (thumb != null && !thumb.isEmpty()) {
				product.setThumb(UploadFile.saveFile(thumb, "product"));
			}

			if (images != null && !images.isEmpty()) {
				String image_urls = UploadFile.saveFiles(images, "product");
				System.out.println("image_urls : " + image_urls);
				product.setImages(image_urls);
			}

			Product createdProduct = productDAO.save(product);

			return ResponseEntity.status(HttpStatus.CREATED).body(createdProduct);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}

	@PutMapping("/admin/product/{id}")
	public ResponseEntity<?> update(@PathVariable Integer id, @RequestParam(required = false) String name,
			@RequestParam(required = false) Integer quantity, @RequestParam(required = false) Double unitPrice,
			@RequestParam(required = false) String description, @RequestParam(required = false) Integer discount,
			@RequestParam(required = false) Integer categoryId,
			@RequestParam(required = false) Boolean status, 
			@RequestParam(required = false) Integer sold,@RequestParam(required = false) MultipartFile thumb,
			@RequestParam(required = false) List<MultipartFile> images) {

		try {
			Optional<Product> optionalProduct = productDAO.findById(id);
			if (!optionalProduct.isPresent()) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
			}

			Product product = optionalProduct.get();

			if (name != null)
				product.setName(name);
			if (quantity != null)
				product.setQuantity(quantity);
			if (unitPrice != null)
				product.setUnitPrice(unitPrice);
			if (sold != null)
				product.setSold(sold);
			if (description != null)
				product.setDescription(description);
			if (status != null)
				product.setStatus(status);
			if (discount != null)
				product.setDiscount(discount);
			if (categoryId != null) {
				Category category = categoryDAO.findById(categoryId)
						.orElseThrow(() -> new IllegalArgumentException("Invalid category ID: " + categoryId));
				product.setCategory(category);
			}

			if (thumb != null && !thumb.isEmpty()) {
				product.setThumb(UploadFile.saveFile(thumb, "product"));
			}

			if (images != null && !images.isEmpty()) {
				String imageUrls = UploadFile.saveFiles(images, "product");
				System.out.println("imageUrls : " + imageUrls);
				product.setImages(imageUrls);
			}

			Product updatedProduct = productDAO.save(product);
			return ResponseEntity.ok(updatedProduct);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}

	@DeleteMapping("/admin/product/{id}")
	public ResponseEntity<?> delete(@PathVariable Integer id) {
		try {
			if (!productDAO.existsById(id)) {
				throw new IllegalArgumentException("Product not found with id: " + id);
			}
			productDAO.deleteById(id);
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build(); // 204 No Content
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}

}
