package com.akshay.uni.exception;

/**
 * This exception is thrown when user is not found in the database
 *
 */
public class UserNotFoundException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public UserNotFoundException() {
		super("User Not Found !!");
	}

	public UserNotFoundException(String message) {
		super(message);
	}

	public UserNotFoundException(int id) {
		super("User Not Found for id: " + id);
	}

}