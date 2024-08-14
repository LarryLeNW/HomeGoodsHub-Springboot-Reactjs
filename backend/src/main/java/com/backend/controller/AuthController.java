package com.backend.controller;

import java.sql.Array;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.backend.dao.UserDAO;
import com.backend.dao.IUserService;
import com.backend.dao.RoleDAO;
import com.backend.entity.Role;
import com.backend.entity.User;
import com.backend.entity.HTTPAction.CustomerResponse;
import com.backend.util.JWTUtil;

import io.jsonwebtoken.Claims;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/api")
public class AuthController {

	@Autowired
	private UserDAO UserDAO;

	@Autowired
	private RoleDAO roleDAO;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private JWTUtil jwtutil;
	@Autowired
	IUserService iUserService;

//
//    @PostMapping("/authenticate")
//    public ResponseEntity<?> authenticateUser(@RequestParam("email") String email,
//                                              @RequestParam("password") String password) {
//        try {
//            Authentication authentication = authenticationManager.authenticate(
//                    new UsernamePasswordAuthenticationToken(email, password));
//
//        
//            SecurityContextHolder.getContext().setAuthentication(authentication);
//
//            Customer customer = customerDAO.findByEmail(email);
//            String token =jwtUtil.generateToken(customer.getEmail());
//            System.out.println(token);
//
//            JwtResponse jwtResponse = new JwtResponse(token, customer.getUsername(), customer.getEmail(), customer.getCustomerRoles());
//
//            return ResponseEntity.ok(jwtResponse);
//        } catch (BadCredentialsException e) {
//        	System.out.println(e);
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Xác thực không thành công: Mật khẩu không đúng");
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Xác thực không thành công: " + e.getMessage());
//        }
//    }

	@GetMapping("/current")
	public ResponseEntity<?> getCurrent(@CookieValue(name = "jwtToken", required = false) String jwtToken) {
		System.out.println("check cookie từ client ....");
		System.out.println("token: " + jwtToken);
		if (jwtToken == null || jwtToken.isEmpty()) {
			System.out.println("khách hàng ko tồn tại");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Khách hàng không tồn tại");
		}
		try {
			Claims claims = jwtutil.getClaims(jwtToken);
			String userEmail = claims.getSubject();
			System.out.println("email: " + userEmail);
			Optional<User> itemCustomer = UserDAO.findByEmail(userEmail);
			User customer = itemCustomer.get();

			if (customer != null) {
				return ResponseEntity.ok(customer);
			} else {
				System.out.println("khách hàng ko tồn tại1");
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Khách hàng không tồn tại");
			}
		} catch (Exception e) {
			System.out.println("khách hàng ko tồn tại3");
			System.out.println("lỗi" + e);
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token không hợp lệ");
		}
	}

	@PostMapping("/updatePassword")
	public ResponseEntity<?> updatePassword(@RequestParam("customerId") Integer customerId,
			@RequestParam("password") String password, @RequestParam("newPassword") String newPassword,
			@RequestParam("confirmPassword") String confirmPassword) {
		Optional<User> customerOptional = UserDAO.findById(customerId);
		if (customerOptional.isPresent()) {
			User customer = customerOptional.get();

			if (passwordEncoder.matches(password, customer.getPassword())) {
				if (newPassword.equals(confirmPassword)) {
					customer.setPassword(passwordEncoder.encode(newPassword));
					UserDAO.save(customer);
					System.out.println("Mật khẩu đã được cập nhật thành công");
					return ResponseEntity.ok().body("Mật khẩu đã được cập nhật thành công");
				} else {
					System.out.println("Mật khẩu mới không khớp");
					return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Mật khẩu mới không khớp");
				}
			} else {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Mật khẩu hiện tại không chính xác");
			}
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Khách hàng không tồn tại");
		}
	}

	@PostMapping("/saveUser")
	public ResponseEntity<String> saveUser(@RequestBody User customer) {
		try {
			System.out.println("chạy tới đây");
			Integer item = iUserService.saveUser(customer);
			String message = "User with id '" + item + "' saved successfully!";
			return ResponseEntity.ok(message);
		} catch (Exception e) {
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("An error occurred while saving user: " + e.getMessage());
		}
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody User customer, HttpServletResponse response) {
		try {
			System.out.println("chạy tới login");
			Optional<User> item = UserDAO.findByEmail(customer.getEmail());
			System.out.println(item.toString());
			if (item.isPresent()) {
				String token = jwtutil.generateToken(customer.getEmail());
				User itemCustomer = item.get();
				Cookie jwtCookie = new Cookie("jwtToken", token);
				jwtCookie.setSecure(true);
				jwtCookie.setPath("/");
				jwtCookie.setMaxAge(24 * 60 * 60);
				response.addCookie(jwtCookie);
				return ResponseEntity.ok(item.get());

			} else {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not found");
			}
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}

	@PostMapping("/register")
	public ResponseEntity<?> Register(@RequestBody User user) {
		try {
			Optional<User> foundUser = UserDAO.findByEmail(user.getEmail());
			if (foundUser.isPresent()) {
				return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Email đã có người sử dụng...");
			}

			User item = UserDAO.save(user);
			return ResponseEntity.ok(item);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}

	}

	@GetMapping("/checkEmail/{email}")
	public ResponseEntity<String> checkEmail(@PathVariable("email") String email) {
		Optional<User> customer = UserDAO.findByEmail(email);

		if (customer.isPresent()) {
			System.out.println(customer.get().getEmail());
			if (customer.get().getEmail().equals(email)) {
				System.out.println("Email đã tồn tại: " + email);
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email Đã tồn tại");
			}
		} else {
			System.out.println("ok rồi đó");
		}
		return ResponseEntity.ok("thành công");
	}

	@GetMapping("/logout")
	public ResponseEntity<String> logout(HttpServletResponse response) {
		try {
			Cookie jwtCookie = new Cookie("jwtToken", null);
			jwtCookie.setSecure(true);
			jwtCookie.setPath("/");
			jwtCookie.setHttpOnly(true);
			jwtCookie.setMaxAge(0);
			response.addCookie(jwtCookie);
			return ResponseEntity.ok("Đã đăng xuất thành công");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi khi đăng xuất: " + e.getMessage());
		}
	}

}
