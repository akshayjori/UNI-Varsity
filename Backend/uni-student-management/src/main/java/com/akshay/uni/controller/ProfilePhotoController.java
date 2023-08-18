package com.akshay.uni.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.akshay.uni.service.ProfilePhotoService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/profilephoto")
@CrossOrigin(origins = "http://localhost:3000")
public class ProfilePhotoController {

	@Autowired
	private ProfilePhotoService service;

	@Operation(summary = "Upload a profile photo of the user")
	@PostMapping("/{studentid}")
	public ResponseEntity<?> uploadImage(@RequestParam("image") MultipartFile file, @PathVariable int studentid)
			throws IOException {
		String uploadImage = service.uploadImage(studentid, file);
		return ResponseEntity.status(HttpStatus.OK).body(uploadImage);
	}

	@Operation(summary = "Download user's profile photo")
	@GetMapping("/{studentid}")
	public byte[] downloadImage(@PathVariable int studentid) {
		byte[] imageData = service.downloadImage(studentid);
		if (imageData == null)
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No profile photo!");
		return imageData;
	}

	@Operation(summary = "Delete user's profile photo")
	@DeleteMapping("/{studentid}")
	public void deleteImage(@PathVariable int studentid) {
		service.deleteImage(studentid);
	}

}