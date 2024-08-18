package com.backend.dao;




import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.entity.*;

public interface AccountDAO extends JpaRepository<Account, String> {
    
}
