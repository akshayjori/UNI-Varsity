package com.akshay.uni.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;

import com.akshay.uni.validation.NotEmpty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Course {

	@Id
	@Column(name = "course_code")
	@NotBlank(message = "Course code field is required")
	private String courseCode;

	@Column(name = "course_name")
	@NotBlank(message = "Course name field is required")
	private String courseName;

	@NotBlank(message = "description field is required")
	private String description;

	@NotEmpty(message = "price field is required")
	private String price;

}