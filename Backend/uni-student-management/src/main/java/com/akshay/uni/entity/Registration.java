package com.akshay.uni.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.validation.constraints.NotBlank;

import com.akshay.uni.validation.NotEmpty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@IdClass(RegistrationId.class)
public class Registration {

	@Id
	@NotEmpty(message = "Student id field is required")
	@Column(name = "student_id")
	private int studentId;

	@Id
	@NotBlank(message = "Course code field is required")
	@Column(name = "course_code")
	private String courseCode;

}