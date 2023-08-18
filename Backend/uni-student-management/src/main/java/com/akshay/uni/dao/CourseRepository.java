package com.akshay.uni.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.akshay.uni.entity.Course;
import com.akshay.uni.entity.CourseReportWrapper;

public interface CourseRepository extends JpaRepository<Course, String> {

	@Query(value = "SELECT NEW com.akshay.uni.entity.CourseReportWrapper(c.courseName, COUNT(*)) "
			+ "FROM Course c JOIN Registration r on c.courseCode=r.courseCode GROUP BY r.courseCode")
	public List<CourseReportWrapper> courseEnrollmentReport();

}