	package com.backend.admin;
	
	import java.util.List;
	
	
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
	import org.springframework.web.bind.annotation.RestController;
	
	import com.backend.dao.OrdersDAO;
	import com.backend.entity.Orders;
	
	import lombok.RequiredArgsConstructor;
	
	@RestController
	@RequiredArgsConstructor // tự tao constructor
	@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
	@RequestMapping("api/")
	public class ManagerOrders {
	
		@Autowired
		OrdersDAO ordersdao;
	
		@GetMapping("/orders")
		public ResponseEntity<?> ShowOrders() {
			try {
				List<Orders> itemOrders = ordersdao.findAll();
				System.out.println(itemOrders);
				return ResponseEntity.ok(itemOrders);
			} catch (Exception ex) {
				ex.printStackTrace();
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi FindAll Orders.");
			}
		}
	
		@PostMapping("orders")
		public ResponseEntity<Orders> PostOrders(@RequestBody Orders orders) {
			try {
				Orders itemOrders = ordersdao.save(orders);
				return ResponseEntity.ok(itemOrders);
			} catch (Exception e) {
				e.printStackTrace();
				// TODO: handle exception
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
			}
		}
	
		@DeleteMapping("orders/{orderId}")
		public ResponseEntity<?> DeleteOrders(@PathVariable Integer orderId) {
			try {
				if (ordersdao.existsById(orderId)) {
					ordersdao.deleteById(orderId);
					return ResponseEntity.ok("xóa thành công Orders có id là : " + orderId);
				} else {
					return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Ko tìm thấy orders có id: " + orderId);
				}
			} catch (Exception e) {
				e.printStackTrace();
				// TODO: handle exception
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi khi xóa orders");
			}
		}
	
		@PutMapping("orders/{orderId}")
		public ResponseEntity<?> PutOrders(@PathVariable Integer orderId, @RequestBody Orders orders) {
			try {
				if (ordersdao.existsById(orderId)) {
					ordersdao.save(orders);
					return ResponseEntity.ok("Update Thành công Orders có id là : " + orderId);
				} else {
					return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy orders có id :" + orderId);
				}
			} catch (Exception e) {
				// TODO: handle exception
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi khi Update orders");
			}
		}
		@GetMapping("/showOrderByCustomer/{customerId}")
		public ResponseEntity<?> showOrderByCustomer(@PathVariable Integer customerId) {
			
			return ResponseEntity.ok(ordersdao.findByUserUserId(customerId));
		}

		
	
	}
