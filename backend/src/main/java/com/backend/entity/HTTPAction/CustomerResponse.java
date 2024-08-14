package com.backend.entity.HTTPAction;

import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerResponse {
	private Integer customerId;
	private Date registeredDate;
	private String phone;
	private String token;
	private String username;
	private String email;
	private List<String> roles;

}
