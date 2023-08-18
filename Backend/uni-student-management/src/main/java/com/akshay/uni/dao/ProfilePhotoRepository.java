package com.akshay.uni.dao;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.akshay.uni.entity.ProfilePhoto;

public interface ProfilePhotoRepository extends JpaRepository<ProfilePhoto, Integer> {

	Optional<ProfilePhoto> findByUserId(int id);
}