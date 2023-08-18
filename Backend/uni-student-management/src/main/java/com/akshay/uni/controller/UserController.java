package com.akshay.uni.controller;

import java.util.Date;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.akshay.uni.entity.Student;
import com.akshay.uni.entity.User;
import com.akshay.uni.exception.UserAlreadyExistException;
import com.akshay.uni.exception.UserNotFoundException;
import com.akshay.uni.service.ProfilePhotoService;
import com.akshay.uni.service.StudentService;
import com.akshay.uni.service.UserService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

	// Wrapper for registration request body
	record RegistrationRequestWrapper(String firstName, String lastName, Date dob, String email, String password) {
	}

	record LoginRequestWrapper(String email) {
	}

	record LoginResponseWrapper(int studentid, String fullname, byte[] photo, String role) {
	}

	PasswordEncoder encoder = new BCryptPasswordEncoder();

	@Autowired
	StudentService studentService;
	@Autowired
	UserService userService;
	@Autowired
	ProfilePhotoService photoService;

	@Operation(summary = "Get general user data")
	@PostMapping("/login/user")
	public LoginResponseWrapper loginHandler(@RequestBody LoginRequestWrapper wrapper) {
		// get student details
		Student s = studentService.findByEmail(wrapper.email());
		if (s == null)
			// no student record was found
			throw new UserNotFoundException();
		// get user to access the role
		User u = userService.findByEmail(wrapper.email());

		String fullname = s.getFirstName() + " " + s.getLastName();
		byte[] photo = photoService.downloadImage(s.getStudentId());
		String role = u == null ? "STUDENT" : u.getRole();

		return new LoginResponseWrapper(s.getStudentId(), fullname, photo, role);
	}

	@Operation(summary = "Register new user")
	@PostMapping("/register")
	@Transactional
	public Student register(@RequestBody RegistrationRequestWrapper user) {
		if (studentService.findByEmail(user.email()) != null) {
			throw new UserAlreadyExistException();
		}
		Student student = new Student(user.firstName(), user.lastName(), user.dob(), user.email());
		userService.save(new User(user.email(), encoder.encode(user.password())));
		// before adding student into db make sure user is created with the email
		// as user.email is a foreign key in student.email
		return studentService.save(student);
	}

	@Operation(summary = "Verify jwt token")
	@GetMapping("/user-auth")
	public String userAuthentication() {
		return "User Authorized.";
	}

}