package com.akshay.uni.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.akshay.uni.service.EmailOTPService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/otp-verification")
public class EmailOTPController {

	@Autowired
	EmailOTPService service;

	record EmailWrapper(String email) {
	}

	record ValidateWrapper(String email, int otp) {
	}

	@Operation(summary = "generates OTP and sends it to the email")
	@PostMapping("/generate")
	public void generateOTP(@RequestBody EmailWrapper wrapper) {
		service.sendEmailOTP(wrapper.email());
	}

	@Operation(summary = "verifies the OTP")
	@PostMapping("/validate")
	public void validateOTP(@RequestBody ValidateWrapper wrapper) {
		service.validateEmailOTP(wrapper.email(), wrapper.otp());
	}

}