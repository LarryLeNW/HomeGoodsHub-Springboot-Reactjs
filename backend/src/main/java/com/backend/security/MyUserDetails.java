package com.backend.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import com.backend.entity.User;
import com.backend.entity.Role;

import java.util.Collection;
import java.util.Collections;

public class MyUserDetails implements UserDetails {
	private User user;
	private Role role;

	public MyUserDetails(User user, Role role) {
		this.user = user;
		this.role = role;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		System.out.println("ROLE_" + user.getRole().getName());
		return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + user.getRole().getName()));
	}

	@Override
	public String getPassword() {
		return user.getPassword();
	}

	@Override
	public String getUsername() {
		return user.getEmail();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true; // Hoặc kiểm tra trạng thái tài khoản
	}

	@Override
	public boolean isAccountNonLocked() {
		return true; // Hoặc kiểm tra trạng thái khóa tài khoản
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true; // Hoặc kiểm tra trạng thái hết hạn của chứng chỉ
	}

	@Override
	public boolean isEnabled() {
		return true; // Hoặc kiểm tra trạng thái kích hoạt tài khoản
	}
}
