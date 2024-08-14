package com.backend.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dao.CartDAO;
import com.backend.dao.UserDAO;
import com.backend.entity.CartItem;
import com.backend.entity.User;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("api/admin/user")
public class ManagerUser {

	@Autowired
	UserDAO customerDao;

	@Autowired
	CartDAO cartDao;

	@GetMapping()
	public ResponseEntity<List<User>> getCustomer() {
		List<User> customer = customerDao.findAll();
		return ResponseEntity.ok(customer);
	}

	@PutMapping("update/{customerId}")
	public ResponseEntity<User> UpdateCustomer(@PathVariable("customerId") Integer customerId ,  @RequestBody User customer) {

		if (customerDao.existsById(customer.getUserId())) {
			User updateCustomer = customerDao.save(customer);
			return ResponseEntity.ok(updateCustomer);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	
	@DeleteMapping("delete/{customerId}")
	public ResponseEntity<?> DeleteCustomer(@PathVariable Integer userId) {
		List<CartItem> item = cartDao.findByUserUserId(userId);
		cartDao.deleteAll(item);
		
		if (customerDao.existsById(userId)) {
			customerDao.deleteById(userId);
			return ResponseEntity.noContent().build();
		} else {
			return ResponseEntity.notFound().build();
		}

	}
	@PostMapping()
	public ResponseEntity<?> AddCustomer(@RequestBody User customer) {

		User addcustomer = customerDao.save(customer);
		return ResponseEntity.ok(addcustomer);
	}
}
