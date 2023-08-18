package com.akshay.uni.jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.akshay.uni.entity.User;
import com.akshay.uni.service.UserService;

/**
 * Custom user details service class for spring security
 *
 */
@Service
public class JwtUserDetailsService implements UserDetailsService {

	@Autowired
	UserService userService;

	@Override
// we want spring boot to search for user using email and not by username
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		User user = userService.findByEmail(email);
		if (user == null) {
			throw new UsernameNotFoundException(String.format("USER_NOT_FOUND '%s'.", email));
		}
		return new JwtUserDetails(user);
	}

}