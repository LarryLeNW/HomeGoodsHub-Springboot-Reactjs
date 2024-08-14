package com.backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.entity.*;

public interface FeedBackDAO extends JpaRepository<FeedBack, Integer> {

}
