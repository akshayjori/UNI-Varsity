package com.akshay.uni.service;

import java.util.ArrayList;

import java.util.List;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;

import org.springframework.data.domain.PageRequest;

import org.springframework.data.domain.Pageable;

import org.springframework.data.domain.Sort;

import org.springframework.stereotype.Service;

import com.akshay.uni.dao.RegistrationRepository;

import com.akshay.uni.dao.StudentRepository;

import com.akshay.uni.dao.UserRepository;

import com.akshay.uni.entity.Course;

import com.akshay.uni.entity.PageableStudentResponse;

import com.akshay.uni.entity.Registration;

import com.akshay.uni.entity.Student;

import com.akshay.uni.entity.User;

import com.akshay.uni.exception.UserAlreadyExistException;

import com.akshay.uni.exception.UserNotFoundException;

@Service
@Transactional
public class StudentServiceImpl implements StudentService {

	@Autowired
	private StudentRepository studentRepo;

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private RegistrationRepository regRepo;

	// removes ADMIN users from students list
	private List<Student> removeAdmins(List<Student> studentList) {
		return studentList.stream().filter(s -> {
			Optional<User> user = userRepo.findByEmail(s.getEmail());
			if (user.isPresent()) {
				return !user.get().getRole().equals("ADMIN");
			}
			return true;
		}).toList();
	}

	@Override
	public List<Student> searchStudent(String search) {

		List<Student> studentList = studentRepo.searchStudents(search); // search by student id
		List<Student> studentById = studentRepo.findAllByStudentId(search);

		for (Student s : studentById) {
			if (!studentList.contains(s))
				studentList.add(s);
		}
		return removeAdmins(studentList);
	}

	@Override
	public Student findByStudentId(int id) {

		Student student = studentRepo.findByStudentId(id);

		// Throw error if no student found
		if (student == null)
			throw new UserNotFoundException("Student not found with id: " + id);
		return student;
	}

	@Override
	public Student findByEmail(String email) {
		return studentRepo.findByEmail(email);
	}

	@Override
	public Student save(Student student) {
		return studentRepo.save(student);
	}

	@Override
	public Student update(Student student) {

		Student dbStudent = studentRepo.findByStudentId(student.getStudentId());

		// Throw error if no student found
		if (dbStudent == null)
			throw new UserNotFoundException();
		// also update the email in user
		if (!dbStudent.getEmail().equals(student.getEmail())) {
			if (!userRepo.findByEmail(student.getEmail()).isPresent())
				userRepo.updateEmail(dbStudent.getEmail(), student.getEmail());
			else {
				throw new UserAlreadyExistException();
			}
		}
		// now we can update student
		return studentRepo.save(student);
	}

	@Override
	public List<Student> findAll() {

		// we want to send only non-ADMIN users
		return studentRepo.findAll().stream().filter(s -> {
			Optional<User> user = userRepo.findByEmail(s.getEmail());
			if (user.isPresent()) {
				return !user.get().getRole().equals("ADMIN");
			}
			return true;
		}).toList();
	}

	@Override
	public PageableStudentResponse findAll(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {

		PageableStudentResponse result = new PageableStudentResponse();
		Pageable pageable;

		if (sortBy.equals("name")) {
			if (sortOrder.equals("desc")) {
				pageable = PageRequest.of(pageNumber, pageSize,
						Sort.by("firstName").descending().and(Sort.by("lastName").descending()));
			} else {
				pageable = PageRequest.of(pageNumber, pageSize, Sort.by("firstName").and(Sort.by("lastName")));
			}
		} else if (sortBy.equals("course")) {

			pageable = PageRequest.of(pageNumber, pageSize);
			Page<Student> page;
			result = new PageableStudentResponse();
			if (sortOrder.equals("desc")) {
				page = studentRepo.findAllByOrderByNoOfCoursesDesc(pageable);
			} else {
				page = studentRepo.findAllByOrderByNoOfCoursesAsc(pageable);
			}
			result.setContent(removeAdmins(page.getContent()));
			result.setPageNumber(page.getNumber());
			result.setPageSize(page.getSize());
			result.setTotalElements(page.getTotalElements());
			result.setTotalPages(page.getTotalPages());
			result.setLast(page.isLast());

			return result;
		} else {
			if (sortOrder.equals("desc")) {
				pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy).descending());
			} else {
				pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy));
			}
		}

		Page<Student> page = studentRepo.findAll(pageable);

		result.setContent(removeAdmins(page.getContent())); // setting list of non-admin students
		result.setPageNumber(page.getNumber());
		result.setPageSize(page.getSize());
		result.setTotalElements(page.getTotalElements());
		result.setTotalPages(page.getTotalPages());
		result.setLast(page.isLast());

		return result;
	}

	@Override
	public void delete(Student student) {
		Student dbStudent = studentRepo.findByStudentId(student.getStudentId());
		// Throw eSrror if no student found
		if (dbStudent == null)
			throw new UserNotFoundException("Student not found with id: " + student.getStudentId());
		
		userRepo.deleteByEmail(dbStudent.getEmail());
		studentRepo.delete(dbStudent);
	}

	@Override
	public void deleteByStudentId(int id) {
		Student student = studentRepo.findByStudentId(id);
		// Throw error if no student found
		if (student == null)
			throw new UserNotFoundException();
		userRepo.deleteByEmail(student.getEmail());
		studentRepo.deleteById(id);
	}

	@Override
	public void enrollCourses(int studentid, List<Course> courses) {
		List<Registration> registrations = new ArrayList<>();
		for (Course c : courses) {
			registrations.add(new Registration(studentid, c.getCourseCode()));
		}
		regRepo.saveAll(registrations);
	}
}
