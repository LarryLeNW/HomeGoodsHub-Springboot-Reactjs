package com.backend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dao.UserDAO;
import com.backend.dao.RoleDAO;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/api/admin/securityUser")
public class UserController {
	@Autowired
	RoleDAO roledao;
	
	
	@Autowired
	UserDAO userDao;

	@GetMapping()
	public Map<String, Object> getCustomerSecurity() {
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("roles", roledao.findAll());
		data.put("customer", userDao.findAll());
		return data;
	}

//	@PostMapping
//	public ResponseEntity<?> insert(@RequestBody Role customerroles) {
//		Roles item = customerroledao.save(customerroles);
//		return ResponseEntity.ok(item);
//	}

//	@DeleteMapping("{customerId}/{roleId}")
//	public ResponseEntity<Void> delete(@PathVariable Integer customerId, @PathVariable String roleId) {
//		Roles customerRole = customerroledao.findByCustomer_CustomerIdAndRole_Id(customerId, roleId);
//		if (customerRole != null) {
//			customerroledao.delete(customerRole);
//		}
//		return ResponseEntity.noContent().build();
//	}

}
