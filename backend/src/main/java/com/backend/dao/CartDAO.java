package com.backend.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.entity.CartItem;
import com.backend.entity.User;
import com.backend.entity.Product;

public interface CartDAO extends JpaRepository<CartItem, Integer> {

	List<CartItem> findByUserUserId(Integer userId);

    List<CartItem> findByProductAndUser(Product product, User user);

}
