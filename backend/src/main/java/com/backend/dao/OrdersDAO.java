package com.backend.dao;

import java.util.Date;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.backend.entity.*;



public interface OrdersDAO extends JpaRepository<Orders, Integer> {
	
    List<Orders> findByUserUserId(Integer userId);
    
    long countByStatus(boolean status);
   
    long count();
    
    @Query("SELECT SUM(o.amount) FROM Orders o WHERE o.orderDate BETWEEN :startDate AND :endDate")
    Float sumAmountBetweenDates(Date startDate, Date endDate);
}
