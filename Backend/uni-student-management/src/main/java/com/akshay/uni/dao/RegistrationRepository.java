package com.akshay.uni.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.akshay.uni.entity.Registration;
import com.akshay.uni.entity.RegistrationId;

public interface RegistrationRepository extends JpaRepository<Registration, RegistrationId> {

}