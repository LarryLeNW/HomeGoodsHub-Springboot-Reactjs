package com.backend.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.entity.Role;

public interface RoleDAO extends JpaRepository<Role, Integer> {
	Page<Role> findAllByNameLike(String keywords, Pageable pageable);

	Role findByName(String name);
}
