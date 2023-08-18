package com.akshay.uni.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.akshay.uni.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {

	public Optional<User> findById(int id);

	public Optional<User> findByEmail(String email);

	public void deleteById(int id);

	public void deleteByEmail(String email);

	@Modifying
	@Query("UPDATE User SET email=?2 where email=?1")
	public void updateEmail(String oldEmail, String newEmail);

}