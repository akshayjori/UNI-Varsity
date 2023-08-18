package com.akshay.uni.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CourseReportWrapper {

	private String courseName;
	private Long noOfRegistrations;
}