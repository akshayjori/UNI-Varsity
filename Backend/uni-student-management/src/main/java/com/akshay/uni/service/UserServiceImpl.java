package com.akshay.uni.service;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.akshay.uni.dao.CourseRepository;
import com.akshay.uni.dao.UserRepository;
import com.akshay.uni.entity.User;
import com.akshay.uni.exception.UserNotFoundException;

@Service
@Transactional
public class UserServiceImpl implements UserService {

	@Autowired
	UserRepository userRepo;
	@Autowired
	CourseRepository courseRepo;

	@Override
	public User findByEmail(String email) {
		Optional<User> user = userRepo.findByEmail(email);
		// Not throwing exception bcoz
		// JwtUserDetailsService will throw it for us
		if (user.isPresent())
			return user.get();
		else
			return null;
	}

	@Override
	public User findById(int id) {
		Optional<User> user = userRepo.findById(id);
		// Throw error if no employee found
		if (!user.isPresent())
			throw new UserNotFoundException(id);
		return user.get();
	}

	@Override
	public void save(User user) {
		userRepo.save(user);
	}

	@Override
	public void deleteByEmail(String email) {
		Optional<User> user = userRepo.findByEmail(email);
		// Throw error if no employee found
		if (!user.isPresent())
			throw new UserNotFoundException();
		userRepo.deleteByEmail(email);
	}

}