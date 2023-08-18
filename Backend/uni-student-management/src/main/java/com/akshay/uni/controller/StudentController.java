package com.akshay.uni.controller;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import java.util.Date;
import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Past;
import javax.validation.constraints.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Link;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.akshay.uni.entity.Course;
import com.akshay.uni.entity.PageableStudentResponse;
import com.akshay.uni.entity.Student;
import com.akshay.uni.service.StudentService;
import com.akshay.uni.service.UserService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/students")
public class StudentController {

	@Autowired
	StudentService studentService;

	@Autowired
	UserService userService;

	// DTO class for Student.class
	public record StudentDto(int studentId,
			@NotBlank(message = "First name field is required dto") @Pattern(regexp = "[A-Za-z]+", message = "First name cannot contain space or special characters dto") String firstName,
			@NotBlank(message = "Last name field is required dto") @Pattern(regexp = "[A-Za-z]+", message = "Last name cannot contain space or special characters dto") String lastName,
			@Past Date dob, @Email String email, List<Course> courses) {
	}

	@Operation(summary = "Get list of all students")
	@GetMapping()
	public PageableStudentResponse getAllStudents(
			@RequestParam(value = "pageNumber", defaultValue = "0", required = false) Integer pageNumber,
			@RequestParam(value = "pageSize", defaultValue = "10", required = false) Integer pageSize,
			@RequestParam(value = "sortBy", defaultValue = "studentId", required = false) String sortBy,
			@RequestParam(value = "sortOrder", defaultValue = "asc", required = false) String sortOrder) {

		PageableStudentResponse response = studentService.findAll(pageNumber, pageSize, sortBy, sortOrder);
		// adding hateos links
		for (Student s : response.getContent()) {
			// link to - a single student
			Link selfLink = linkTo(StudentController.class).slash(s.getStudentId()).withSelfRel();
			s.add(selfLink);
			// link to - search by keyword
			Link searchLink = linkTo(methodOn(StudentController.class).searchStudents(s.getFirstName()))
					.withRel("self-search");
			s.add(searchLink);
			// link to - order by
			Link orderLink = linkTo(methodOn(StudentController.class).getAllStudents(0, 10, "name", "desc"))
					.withRel("self-order");
			s.add(orderLink);
		}
		return response;
	}

	@Operation(summary = "Get list of students by searchword")
	@GetMapping(params = "search")
	public List<Student> searchStudents(@RequestParam("search") String search) {
		List<Student> students = studentService.searchStudent(search);
		for (Student s : students) {
			// link to - a single student
			Link selfLink = linkTo(StudentController.class).slash(s.getStudentId()).withSelfRel();
			s.add(selfLink);
			// link to - order by
			Link orderLink = linkTo(methodOn(StudentController.class).getAllStudents(0, 10, "email", "asc"))
					.withRel("self-order");
			s.add(orderLink);
		}

		return students;
	}

	@Operation(summary = "Creates new student")
	@PostMapping()
	public Student createStudent(@Valid @RequestBody StudentDto studentdto) {
		Student student = convertDtotoStudent(studentdto);
		return studentService.save(student);
	}

	@Operation(summary = "Get a student by id")
	@GetMapping("/{studentid}")
	public Student getStudentDetails(@PathVariable int studentid) {
		Student student = studentService.findByStudentId(studentid);
		// link to - all students
		Link allLink = linkTo(StudentController.class).withRel("all");
		student.add(allLink);
		return student;
	}

	@Operation(summary = "Update an existing student")
	@PutMapping("/{studentid}")
	public Student updateStudentDetails(@Valid @RequestBody StudentDto studentdto, @PathVariable int studentid) {
		Student student = convertDtotoStudent(studentdto);
		student.setStudentId(studentid);
		return studentService.update(student);
	}

	@Operation(summary = "Delete a single student by id")
	@DeleteMapping("/{studentid}")
	public void deleteStudent(@PathVariable int studentid) {
		studentService.deleteByStudentId(studentid);
	}

	@Operation(summary = "Register list of courses to a student")
	@PostMapping("/{studentid}/enroll")
	public void enrollCourses(@RequestBody List<Course> courses, @PathVariable int studentid) {
		studentService.enrollCourses(studentid, courses);
	}

	private Student convertDtotoStudent(StudentDto dto) {
		Student student = new Student();
		student.setStudentId(dto.studentId());
		student.setFirstName(dto.firstName());
		student.setLastName(dto.lastName());
		student.setEmail(dto.email());
		student.setDob(dto.dob());
		student.setCourses(dto.courses());
		return student;
	}

}