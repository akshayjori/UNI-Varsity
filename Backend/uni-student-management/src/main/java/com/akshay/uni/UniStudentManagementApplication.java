package com.akshay.uni;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@OpenAPIDefinition
public class UniStudentManagementApplication {

  public static void main(String[] args) {
    SpringApplication.run(UniStudentManagementApplication.class, args);
  }
}
