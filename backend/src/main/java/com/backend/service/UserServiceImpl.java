package com.backend.service;

import java.util.HashSet;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.backend.dao.UserDAO; 
import com.backend.dao.IUserService;
import com.backend.entity.User;
import com.backend.entity.Role;

@Service
public class UserServiceImpl implements IUserService,UserDetailsService {
    
    @Autowired
    private UserDAO userDAO; 

    @Autowired
    private BCryptPasswordEncoder bCryptEncoder;

    @Override
	public Integer saveUser(User customer) {
		//Encode password before saving to DB
    	customer.setPassword(bCryptEncoder.encode(customer.getPassword()));
		return userDAO.save(customer).getUserId();
	}

	//find user by username
	@Override
	public Optional<User> findByEmail(String email) {
		return userDAO.findByEmail(email);
	}
	
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<User> opt = userDAO.findByEmail(email);

        if (opt.isEmpty()) {
            throw new UsernameNotFoundException("User with username: " + email + " not found");
        }

        User customer = opt.get(); // Lấy thông tin người dùng từ DB
		Role role = customer.getRole();
        Set<GrantedAuthority> authorities = new HashSet<>();
            authorities.add(new SimpleGrantedAuthority(role.getName())); 

        return new org.springframework.security.core.userdetails.User(
        		email,
                customer.getPassword(),
                authorities
        );
    }
}
