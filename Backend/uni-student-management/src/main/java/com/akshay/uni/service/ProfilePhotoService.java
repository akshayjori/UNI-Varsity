package com.akshay.uni.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

public interface ProfilePhotoService {

	/**
	 * upload profile photo of the student/user
	 * 
	 * @param studentid (of the student)
	 * @param file          
	 * @return     
	 * @throws IOException     
	 */
	String uploadImage(int studentid, MultipartFile file) throws IOException;

	/**
	 * download the profile photo of the student by student id          
	 * 
	 * @param studentid     
	 * @return     
	 */
	byte[] downloadImage(int studentid);

	/**
	 * delete profile photo of the student by student id     
	 * 
	 * @param studentid     
	 */
	void deleteImage(int studentid);

}