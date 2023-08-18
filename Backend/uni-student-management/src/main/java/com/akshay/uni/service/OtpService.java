package com.akshay.uni.service;

import org.springframework.context.annotation.Description;
import org.springframework.stereotype.Service;

import com.akshay.uni.exception.InvalidOTPException;

@Description(value = "Service responsible for handling OTP related functionality.")
@Service
public class OtpService {

	private OtpGenerator otpGenerator;

	/**
	 * Constructor dependency injector
	 * 
	 * @param otpGenerator - otpGenerator dependency     
	 */
	public OtpService(OtpGenerator otpGenerator) {
		this.otpGenerator = otpGenerator;
	}

	public OtpService() {
		this.otpGenerator = new OtpGenerator();
	}

	/**
	 *      * Method for generating OTP number      *      * @param key - provided
	 * key (username in this case)      * @return boolean value (true|false)     
	 */
	public Integer generateOtp(String key) {
		// generate otp in cache
		return otpGenerator.generateOTP(key);
	}

	/**
	 * Method for validating provided OTP
	 * 
	 * @param key       - provided key     
	 * @param otpNumber - provided OTP number     
	 * @return boolean value (true|false)     
	 */
	public Boolean validateOTP(String key, Integer otpNumber) {
		// get OTP from cache
		Integer cacheOTP = otpGenerator.getOPTByKey(key);
		if (cacheOTP != null && cacheOTP.equals(otpNumber)) {
			otpGenerator.clearOTPFromCache(key);
			return true;
		}
		throw new InvalidOTPException();
	}
}