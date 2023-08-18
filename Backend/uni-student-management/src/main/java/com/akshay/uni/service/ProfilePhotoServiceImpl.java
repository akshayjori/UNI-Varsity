package com.akshay.uni.service;

import java.io.IOException;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.akshay.uni.dao.ProfilePhotoRepository;
import com.akshay.uni.dao.StudentRepository;
import com.akshay.uni.dao.UserRepository;
import com.akshay.uni.entity.ProfilePhoto;
import com.akshay.uni.entity.User;
import com.akshay.uni.exception.UserNotFoundException;
import com.akshay.uni.util.ImageUtils;

@Service
@Transactional
public class ProfilePhotoServiceImpl implements ProfilePhotoService {

	@Autowired
	private ProfilePhotoRepository repository;
	@Autowired
	private StudentRepository studentRepo;
	@Autowired
	private UserRepository userRepo;
	@Autowired
	private ProfilePhotoRepository photoRepo;

	@Override
	public String uploadImage(int studentid, MultipartFile file) throws IOException {
// first check if profile photo is already uploaded for the user
		Optional<User> user = userRepo.findByEmail(studentRepo.findByStudentId(studentid).getEmail());
		if (user.isPresent()) {
			int userid = user.get().getId();
			Optional<ProfilePhoto> dbPhoto = photoRepo.findByUserId(userid);
			// setup profilephoto object
			ProfilePhoto photo = ProfilePhoto.builder().userId(userid).name(file.getOriginalFilename())
					.type(file.getContentType()).imageData(ImageUtils.compressImage(file.getBytes())).build();
// if user already has one profilephoto in the db
			// we would want to update that only
			if (dbPhoto.isPresent()) {
				photo.setId(dbPhoto.get().getId());
			}
// save the photo in db
			repository.save(photo);
			return "file uploaded successfully : " + file.getOriginalFilename();
		} else {
			return "User not found";
		}
	}

	@Override
	public void deleteImage(int studentid) {
// check if user even has the photo in db
		Optional<User> user = userRepo.findByEmail(studentRepo.findByStudentId(studentid).getEmail());
		if (user.isPresent()) {
			int userid = user.get().getId();
			Optional<ProfilePhoto> dbPhoto = photoRepo.findByUserId(userid);
			if (dbPhoto.isPresent()) { // if user has photo in db
				photoRepo.delete(dbPhoto.get());
			} else { // if user doesn't have the photo in db
				throw new UserNotFoundException("No Profile Photo to Delete.");
			}
		} else { // if no user with the given email found
			throw new UserNotFoundException(studentid);
		}
	}

	@Override
	public byte[] downloadImage(int studentid) {
// get the user to know the userid
		Optional<User> user = userRepo.findByEmail(studentRepo.findByStudentId(studentid).getEmail());
		if (user.isPresent()) {
			Optional<ProfilePhoto> dbImageData = repository.findByUserId(user.get().getId());
			if (dbImageData.isPresent())
				return ImageUtils.decompressImage(dbImageData.get().getImageData());
		}
		return null;
	}
}