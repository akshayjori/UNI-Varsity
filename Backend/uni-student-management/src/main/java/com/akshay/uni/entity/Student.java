package com.akshay.uni.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;
import javax.validation.constraints.Pattern;

import org.springframework.hateoas.RepresentationModel;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
public class Student extends RepresentationModel<Student> {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "student_id")
	private int studentId;

	@NotBlank(message = "First name field is required")
	@Pattern(regexp = "[A-Za-z]+", message = "First name cannot contain space or special characters")
	@Column(name = "first_name")
	private String firstName;

	@NotBlank(message = "Last name field is required")
	@Pattern(regexp = "[A-Za-z]+", message = "Last name cannot contain space or special characters")
	@Column(name = "last_name")
	private String lastName;

	@Past
	@JsonFormat(pattern = "yyyy-MM-dd", shape = Shape.STRING, timezone = "IST")
	private Date dob;

	@Email
	@NotBlank(message = "Email field is required")
	private String email;

	@OneToMany()
	@JoinTable(name = "registration", joinColumns = { @JoinColumn(name = "student_id") }, inverseJoinColumns = {
			@JoinColumn(name = "course_code") })
	private List<Course> courses;

	public Student(
			@NotBlank(message = "First name field is required") @Pattern(regexp = "[A-Za-z]+", message = "First name cannot contain space or special characters") String firstName,
			@NotBlank(message = "Last name field is required") @Pattern(regexp = "[A-Za-z]+", message = "Last name cannot contain space or special characters") String lastName,
			@Past @NotNull(message = "DOB field is required") Date dob, @Email String email) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.dob = dob;
		this.email = email;
	}

}