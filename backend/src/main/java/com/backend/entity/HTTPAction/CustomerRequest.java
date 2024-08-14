package com.backend.entity.HTTPAction;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerRequest {

	 String email;	
	 String password;
	 String getUsername;
}