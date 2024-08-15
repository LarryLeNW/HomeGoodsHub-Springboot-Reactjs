package com.backend.security;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.backend.dao.UserDAO;
import com.backend.entity.Role;
import com.backend.entity.User;

public class UserDetailService implements UserDetailsService {

    @Autowired
    private UserDAO userDAO;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Tìm kiếm người dùng theo email
        Optional<User> userOptional = userDAO.findByEmail(email);
        
        // Kiểm tra nếu không tìm thấy người dùng
        if (userOptional.isEmpty()) {
        	System.out.println("Not found user");
        }

        // Lấy người dùng từ Optional
        User user = userOptional.get();
        Role role = user.getRole(); // Xử lý đối tượng Role đơn lẻ

        // Giả sử MyUserDetails cần Role để xây dựng
        return new MyUserDetails(user, role);
    }
}
