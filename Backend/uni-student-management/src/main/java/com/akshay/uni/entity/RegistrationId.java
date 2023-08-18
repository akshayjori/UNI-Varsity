package com.akshay.uni.entity;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegistrationId implements Serializable {

	private static final long serialVersionUID = 1L;

	private String courseCode;

	private int studentId;

}