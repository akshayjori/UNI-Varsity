package com.akshay.uni.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailOTPServiceImpl implements EmailOTPService {

	@Autowired
	private JavaMailSender emailSender;

	@Autowired
	private OtpService otpService;

	@Override
	public Boolean sendEmailOTP(String emailTo) {
		SimpleMailMessage mailMessage = new SimpleMailMessage();
		mailMessage.setTo(emailTo);
		mailMessage.setSubject("OTP: UNI Varsity");
		mailMessage.setText("Your OTP for UNI Varsity is " + otpService.generateOtp(emailTo));

		emailSender.send(mailMessage);
		return true;
	}

	@Override
	public Boolean validateEmailOTP(String email, int otp) {
		otpService.validateOTP(email, otp);
		return false;
	}

}