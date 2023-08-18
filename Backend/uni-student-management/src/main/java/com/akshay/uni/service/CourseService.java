package com.akshay.uni.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.akshay.uni.entity.Course;
import com.akshay.uni.entity.CourseReportWrapper;

@Service
public interface CourseService {

	/**
	 * @return Returns all the courses present in the database    
	 */
	List<Course> findAll();

	/**
	 * @return Get no of registrations for each course     
	 */
	public List<CourseReportWrapper> courseEnrollmentReport();

	/**
	 * creates the course in database
	 * 
	 * @param course     
	 */
	Course save(Course course);

	/**
	 * deletes the course from database
	 * 
	 * @param course     
	 */
	void delete(Course course);

}