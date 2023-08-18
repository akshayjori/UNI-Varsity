package com.akshay.uni.service;


import java.util.List;


import org.springframework.stereotype.Service;


import com.akshay.uni.entity.Course;
import com.akshay.uni.entity.PageableStudentResponse;
import com.akshay.uni.entity.Student;
import com.akshay.uni.exception.UserAlreadyExistException;
import com.akshay.uni.exception.UserNotFoundException;


@Service
public interface StudentService {


/**
     * 
     * @return List of all students
     */
 public List<Student> findAll();

/**
     * return student by id
     * 
     * @param id
     * @return
     */
 public Student findByStudentId(int id);



/**
     * return student having the provided email
     * 
     * @param email
     * @return
     */
 public Student findByEmail(String email);



/**
     * delete the provided student from database
     * 
     * @param student
     */
 public void delete(Student student);


/**
     * delete the student by his/her id
     * 
     * @param studentId
     */
 public void deleteByStudentId(int studentId);


/**
     * creates new student in database
     * 
     * @param student
     * @return Student created
     * @throws UserAlreadyExistException if student exists with same email
     */
 public Student save(Student student);



/**
     * checks if student is present and updates the same. updates the email if
     * changed in user table too.
     * 
     * @param student
     * @return
     * @throws UserNotFoundException if no student found
     */
 public Student update(Student student);


/**
     * 
     * @param studentid
     * @param courses
     */
 void enrollCourses(int studentid, List<Course> courses);

/**
     * search students by searchword (which may match partially or completely with
     * the studentId/firstName/lastName/email/courseCode/courseName)
     * 
     * @param search
     * @return List<Student>
     */
 List<Student> searchStudent(String search);

/**
     * Gets pageable student list
     * 
     * @param pageNumber
     * @param pageSize
     * @param sortBy
     * @param sortOrder
     * @return
     */
 PageableStudentResponse findAll(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);


}