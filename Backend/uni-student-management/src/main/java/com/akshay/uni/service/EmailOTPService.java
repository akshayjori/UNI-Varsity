package com.akshay.uni.service;

import org.springframework.stereotype.Service;

@Service
public interface EmailOTPService {

	/**
	 * Method for sending OTP to email
	 * 
	 * @param emailTO - recipients email id  
	 */
	Boolean sendEmailOTP(String emailTo);

	/**
	 * Method for validating OTP sent to email
	 * 
	 * @param email - Email id to which the OTP was send
	 * @param otp   - OTP sent to the recipients email.     
	 */
	Boolean validateEmailOTP(String email, int otp);

}