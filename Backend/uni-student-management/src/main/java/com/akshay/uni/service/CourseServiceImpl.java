package com.akshay.uni.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.akshay.uni.dao.CourseRepository;
import com.akshay.uni.dao.UserRepository;
import com.akshay.uni.entity.Course;
import com.akshay.uni.entity.CourseReportWrapper;

@Service
@Transactional
public class CourseServiceImpl implements CourseService {

	@Autowired
	UserRepository userRepo;
	@Autowired
	CourseRepository courseRepo;

	@Override
	public List<Course> findAll() {
		return courseRepo.findAll();
	}

	@Override
	public Course save(Course course) {
		return courseRepo.save(course);
	}

	@Override
	public void delete(Course course) {
		courseRepo.delete(course);
	}

	@Override
	public List<CourseReportWrapper> courseEnrollmentReport() {
		return courseRepo.courseEnrollmentReport();
	}
}