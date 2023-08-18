package com.akshay.uni.exception;

/**
 * This exception is thrown when the provided OTP does not match the OTP value
 * in the cache
 *
 */
public class InvalidOTPException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public InvalidOTPException() {
		super("Invalid OTP");
	}

}