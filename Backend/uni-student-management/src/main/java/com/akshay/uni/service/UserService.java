package com.akshay.uni.service;


import org.springframework.stereotype.Service;

import com.akshay.uni.entity.User;



@Service

public interface UserService {



/**

     * get user by id

     * 

     * @param id

     * @return

     */

 public User findById(int id);



/**

     * get user by email

     * 

     * @param email

     * @return

     */

 public User findByEmail(String email);



/**

     * save or update user

     * 

     * @param user

     */

 public void save(User user);

/**

     * delete user having given email

     * 

     * @param email

     */

 public void deleteByEmail(String email);



}
