package com.akshay.uni.controller;

import javax.validation.ConstraintViolationException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.server.ResponseStatusException;

import com.akshay.uni.exception.InvalidOTPException;
import com.akshay.uni.exception.UserAlreadyExistException;
import com.akshay.uni.exception.UserNotFoundException;

/**
 * This handles the exceptions thrown while processing the requests and returns
 * a ErrorResponse to the client
 */
@ControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler
	@ResponseStatus(HttpStatus.FORBIDDEN)
	public ResponseEntity<ErrorResponse> invalidOTPExceptionHandler(InvalidOTPException e) {
		ErrorResponse errorResponse = new ErrorResponse();

		errorResponse.setStatus(HttpStatus.FORBIDDEN.value());
		errorResponse.setMessage(e.getMessage());
		errorResponse.setTimeStamp(System.currentTimeMillis());

		return new ResponseEntity<>(errorResponse, HttpStatus.FORBIDDEN);
	}

	@ExceptionHandler
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ResponseEntity<ErrorResponse> userNotFoundExceptionHandler(UserNotFoundException e) {
		ErrorResponse errorResponse = new ErrorResponse();

		errorResponse.setStatus(HttpStatus.NOT_FOUND.value());
		errorResponse.setMessage(e.getMessage());
		errorResponse.setTimeStamp(System.currentTimeMillis());

		return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler
	public ResponseEntity<ErrorResponse> responseStatusExceptionHandler(ResponseStatusException e) {
		ErrorResponse errorResponse = new ErrorResponse();

		errorResponse.setStatus(e.getRawStatusCode());
		errorResponse.setMessage(e.getMessage());
		errorResponse.setTimeStamp(System.currentTimeMillis());

		return new ResponseEntity<>(errorResponse, e.getStatus());
	}

	@ExceptionHandler
	@ResponseStatus(HttpStatus.FORBIDDEN)
	public ResponseEntity<ErrorResponse> userAlreadyExistsExceptionHandler(UserAlreadyExistException e) {
		ErrorResponse errorResponse = new ErrorResponse();

		errorResponse.setStatus(HttpStatus.FORBIDDEN.value());
		errorResponse.setMessage(e.getMessage());
		errorResponse.setTimeStamp(System.currentTimeMillis());

		return new ResponseEntity<>(errorResponse, HttpStatus.FORBIDDEN);
	}

	@ExceptionHandler
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ResponseEntity<ErrorResponse> handleMethodArgumentNotValidException(MethodArgumentNotValidException exc) {
		ErrorResponse error = new ErrorResponse();

		error.setStatus(HttpStatus.BAD_REQUEST.value());
		StringBuilder message = new StringBuilder();
		exc.getBindingResult().getAllErrors().forEach(e -> message.append(e.getDefaultMessage() + ", "));
		error.setMessage(message.toString().trim());
		error.setTimeStamp(System.currentTimeMillis());

		return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ResponseEntity<ErrorResponse> handleConstraintViolationException(ConstraintViolationException exc) {
		ErrorResponse error = new ErrorResponse();

		error.setStatus(HttpStatus.BAD_REQUEST.value());
		StringBuilder message = new StringBuilder();
		exc.getConstraintViolations().forEach(e -> message.append(e.getMessage() + ", "));
		error.setMessage(message.toString().trim());
		error.setTimeStamp(System.currentTimeMillis());

		return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	public ResponseEntity<ErrorResponse> handleOtherExceptions(Exception exc) {
		ErrorResponse error = new ErrorResponse();

		error.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
		error.setMessage(exc.getMessage());
		error.setTimeStamp(System.currentTimeMillis());

		return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
	}
}