package com.akshay.uni.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user_photo")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProfilePhoto {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(name = "user_id")
	@com.akshay.uni.validation.NotEmpty
	private int userId;

	private String name;
	private String type;
	@Lob
	@Column(name = "image_data", length = 1000)
	@NotEmpty(message = "Couldn't find any data file")
	private byte[] imageData;
}