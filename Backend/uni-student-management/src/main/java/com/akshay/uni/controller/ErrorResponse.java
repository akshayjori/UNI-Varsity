package com.akshay.uni.controller;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Error format to be sent as a response body when an exception is occurred
 * while processing the request
 *
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ErrorResponse {

	private int status;
	private String message;
	private long timeStamp;
}