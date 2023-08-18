package com.akshay.uni.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.akshay.uni.entity.Course;
import com.akshay.uni.entity.CourseReportWrapper;
import com.akshay.uni.service.CourseService;
import com.akshay.uni.service.UserService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/courses")
public class CourseController {

	@Autowired
	CourseService courseService;

	@Autowired
	UserService userService;

	@Operation(summary = "Gets list of courses present in db")
	@GetMapping()
	public List<Course> getAllCourses() {
		return courseService.findAll();
	}

	@Operation(summary = "Gets report of no of registrations done for each course")
	@GetMapping("/report")
	public List<CourseReportWrapper> getCourseRegistrationReport() {
		return courseService.courseEnrollmentReport();
	}

}