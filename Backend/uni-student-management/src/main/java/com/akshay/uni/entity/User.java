package com.akshay.uni.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.akshay.uni.validation.Roles;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Email
	@NotBlank(message = "Email field is required")
	private String email;

	@NotBlank(message = "Password field is required")
	@Size(min = 6, message = "Password must be of minimum length of 6")
	private String password;

	@Roles(values = { "STUDENT", "ADMIN" })
	private String role = "STUDENT";

	public User(@Email String email,
			@NotBlank(message = "Password field is required") @Size(min = 6, message = "Password must be of minimum length of 6") String password) {
		this.email = email;
		this.password = password;
	}

}