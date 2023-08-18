package com.akshay.uni.exception;

/**
 * This exception is thrown when the user already exists in the database with
 * the provided email
 *
 */
public class UserAlreadyExistException extends RuntimeException {

	/**
	 *      *      
	 */
	private static final long serialVersionUID = 1L;

	public UserAlreadyExistException() {
		super("User already exists with this email!");
	}

	public UserAlreadyExistException(String message) {
		super(message);
	}

}