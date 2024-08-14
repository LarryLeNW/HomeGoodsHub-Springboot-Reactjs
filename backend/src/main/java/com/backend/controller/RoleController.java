package com.backend.controller;

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

import com.backend.dao.CategoryDAO;
import com.backend.dao.RoleDAO;
import com.backend.entity.Category;
import com.backend.entity.Role;
import com.backend.util.UploadFile;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/admin/api/role")
public class RoleController {
	   @Autowired
	    RoleDAO roleDAO;
	    

	    @GetMapping("")
	    public ResponseEntity<?> get(
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

	            Page<Role> itemPage = roleDAO.findAllByNameLike("%" + keywords + "%", pageable);

	            return ResponseEntity.ok(itemPage);
	        } catch (Exception e) {
	            e.printStackTrace();
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
	        }
	    }

	    @PostMapping("")
	    public ResponseEntity<?> create(
	            @RequestBody Role role) {

	        if (role.getName() == null || role.getName().trim().isEmpty()) {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing required parameter: name");
	        }

	        try {
	            Role createdRole = roleDAO.save(role);

	            return ResponseEntity.status(HttpStatus.CREATED).body(createdRole);
	        } catch (Exception e) {
	            e.printStackTrace();
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
	        }
	    }
	    
	    @DeleteMapping("/{id}")
	    public ResponseEntity<?> delete(@PathVariable Integer id) {
	        try {
	            // Kiểm tra sự tồn tại của category
	            if (!roleDAO.existsById(id)) {
	                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Category not found with id: " + id);
	            }

	            // Xóa category
	            roleDAO.deleteById(id);

	            return ResponseEntity.ok("Deleted successfully"); // Trả về trạng thái 204 No Content
	        } catch (Exception e) {
	            e.printStackTrace();
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
	        }
	    }
	    
	    @PutMapping("/{id}")
	    public ResponseEntity<?> update(
	            @PathVariable Integer id,
	            @RequestParam(required = false) String name) {

	        try {
	            Role role = roleDAO.findById(id)
	                    .orElseThrow(() -> new IllegalArgumentException("Role not found with id: " + id));

	            if (name != null && !name.trim().isEmpty()) {
	            	role.setName(name);
	            }
	          

	           Role createdDAO = roleDAO.save(role);

	            return ResponseEntity.ok(createdDAO);
	        } catch (Exception e) {
	            e.printStackTrace();
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
	        }
	    }
}
