package com.backend.dao;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.entity.*;

public interface UserDAO extends JpaRepository<User, Integer> {
	
    Optional<User> findByEmail(String email);

    long count();

    Page<User> findAllByUsernameLike(String username, Pageable pageable);
    
	

}
