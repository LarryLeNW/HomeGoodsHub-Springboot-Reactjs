package com.backend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

import com.backend.dao.UserDAO;
import com.backend.entity.Role;
import com.backend.entity.User;
import com.backend.util.UploadFile;
import com.backend.dao.RoleDAO;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/api/admin/users")
public class UserController {

	@Autowired
	UserDAO userDAO;

	@Autowired
	RoleDAO roleDAO;

	@GetMapping("")
	public ResponseEntity<?> get(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "8") int pageSize,
			@RequestParam(required = false, defaultValue = "") String keywords,
			@RequestParam(required = false) String sortBy,
			@RequestParam(required = false, defaultValue = "asc") String sortOrder) {

		try {
			Pageable pageable;
			if (sortBy != null && !sortBy.isEmpty()) {
				Sort.Direction direction = "desc".equalsIgnoreCase(sortOrder) ? Sort.Direction.DESC
						: Sort.Direction.ASC;
				Sort sort = Sort.by(direction, sortBy);
				pageable = PageRequest.of(page - 1, pageSize, sort);
			} else {
				pageable = PageRequest.of(page - 1, pageSize);
			}

			System.out.println(pageable.toString());

			Page<User> itemPage = userDAO.findAllByUsernameLike("%" + keywords + "%", pageable);

			return ResponseEntity.ok(itemPage);
		} catch (Exception e) {
			e.printStackTrace(); // Print stack trace for debugging
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}

	@PostMapping
	public ResponseEntity<?> create(@RequestBody User user, @RequestParam(required = false) MultipartFile image) {
		try {
			if (image != null && !image.isEmpty()) {
				user.setAvatar(UploadFile.saveFile(image, "User"));
			}
			
			System.out.println("check :" + user.getRole());

			if (user.getRole() != null && user.getRole().getRoleId() != null) {
				Role role = roleDAO.findById(user.getRole().getRoleId())
						.orElseThrow(() -> new IllegalArgumentException("Invalid role ID"));
				user.setRole(role);
			}

			User savedUser = userDAO.save(user);
			return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> delete(@PathVariable Integer id) {
		try {
			if (!userDAO.existsById(id)) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found with id: " + id);
			}
			userDAO.deleteById(id);
			return ResponseEntity.ok("Deleted successfully");
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> update(@PathVariable Integer id, @RequestBody User user,
			@RequestParam(required = false) MultipartFile image) {
		try {
			User existingUser = userDAO.findById(id)
					.orElseThrow(() -> new IllegalArgumentException("User not found with id: " + id));
			
			
			
			existingUser.setAddress(user.getAddress());
			existingUser.setAvatar(user.getAvatar());
			existingUser.setEmail(user.getEmail());
			existingUser.setPassword(user.getPassword());
			existingUser.setPhone(user.getPhone());
			
			if (user.getRole() != null && user.getRole().getRoleId() != null) {
				Role role = roleDAO.findById(user.getRole().getRoleId())
						.orElseThrow(() -> new IllegalArgumentException("Invalid role ID"));
				existingUser.setRole(role);
			}
			
			if (image != null && !image.isEmpty()) {
				user.setAvatar(UploadFile.saveFile(image, "User"));
			}
			User updatedUser = userDAO.save(existingUser);
			return ResponseEntity.ok(updatedUser);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}
}
