package com.backend.dao;

import java.util.Optional;

import com.backend.entity.User;



public interface IUserService {

	Integer saveUser(User user);
	
    Optional<User> findByEmail(String email);

}