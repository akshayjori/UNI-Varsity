package com.akshay.uni.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.akshay.uni.entity.Student;

public interface StudentRepository extends JpaRepository<Student, Integer> {

	public Student findByEmail(String email);

	public Student findByStudentId(int id);

	public void deleteByStudentId(int id);

	@Query(value = "SELECT * from student where student_id like %:search%", nativeQuery = true)
	public List<Student> findAllByStudentId(String search);

	@Query(value = "select distinct s from Student s left join Registration r on s.studentId=r.studentId "
			+ "left join Course c on r.courseCode= c.courseCode "
			+ "where (concat(s.firstName,' ', s.lastName) like %:search% or s.email like %:search% "
			+ "or c.courseName like %:search% or c.courseCode like %:search%)")
	public List<Student> searchStudents(String search);

	@Query(value = "select s from Student s left join Registration r on s.studentId= r.studentId "
			+ "group by s.studentId order by COUNT(r.courseCode)")
	public Page<Student> findAllByOrderByNoOfCoursesAsc(Pageable pageable);

	@Query(value = "select s from Student s left join Registration r on s.studentId= r.studentId "
			+ "group by s.studentId order by COUNT(r.courseCode) desc")
	public Page<Student> findAllByOrderByNoOfCoursesDesc(Pageable pageable);
}