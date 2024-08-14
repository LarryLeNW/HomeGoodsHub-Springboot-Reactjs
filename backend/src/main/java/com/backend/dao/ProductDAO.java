package com.backend.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.entity.*;

public interface ProductDAO extends JpaRepository<Product, Integer> {

	Page<Product> findByunitPriceBetween(float minPrice, float maxPrice, Pageable pageable);

	Page<Product> findAllByNameLike(String keywords, Pageable pageable);

	Page<Product> findByNameLikeAndCategoryNameLike(String nameKeyword, String categoryKeyword, Pageable pageable);

}
