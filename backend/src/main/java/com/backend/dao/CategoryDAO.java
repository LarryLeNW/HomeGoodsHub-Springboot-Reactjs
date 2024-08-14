package com.backend.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;



import com.backend.entity.*;

public interface CategoryDAO extends JpaRepository<Category, Integer> {
	Page<Category> findAllByNameLike(String keywords, Pageable pageable);
}
