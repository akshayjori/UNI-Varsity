CREATE USER 'akshayj51'@'localhost' IDENTIFIED BY 'akshayj51';
GRANT ALL PRIVILEGES ON * . * TO 'akshayj51'@'localhost';
ALTER USER 'akshayj51'@'localhost' IDENTIFIED WITH mysql_native_password BY 'welcome123';

CREATE DATABASE IF NOT EXISTS `uni_student_management`;
USE `uni_student_management`;

DROP TABLE IF EXISTS `student`;
DROP TABLE IF EXISTS `course`;
DROP TABLE IF EXISTS `registration`;
DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `user_photo`;

CREATE TABLE user ( 
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
email varchar(45) NOT NULL UNIQUE,
password varchar(200) NOT NULL,
role varchar(45) DEFAULT "STUDENT"
) AUTO_INCREMENT=101;

INSERT INTO `user`
(email, password, role)
VALUES ('akshay@gmail.com', '$2a$12$Mpmkod6Pr7nvp1m6HsjqHuyqO2BogcQ29kE8eSRUSb2oEi4oUUAZi', 'ADMIN');
INSERT INTO `user`
(`email`, `password`, `role`)
VALUES ('rutik@gmail.com', '$2a$12$Mpmkod6Pr7nvp1m6HsjqHuyqO2BogcQ29kE8eSRUSb2oEi4oUUAZi', 'STUDENT');
INSERT INTO `user`
(`email`, `password`, `role`)
VALUES ('john@gmail.com', '$2a$12$Mpmkod6Pr7nvp1m6HsjqHuyqO2BogcQ29kE8eSRUSb2oEi4oUUAZi', 'STUDENT');

CREATE TABLE user_photo (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
user_id INT NOT NULL,
name varchar(45) NOT NULL,
type varchar(45) NOT NULL,
image_data longblob NOT NULL,
FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE student (
student_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
first_name varchar(45) NOT NULL,
last_name varchar(45) NOT NULL,
dob DATE NOT NULL,
email varchar(50) NOT NULL UNIQUE,
FOREIGN KEY (email) REFERENCES user(email) 
ON DELETE CASCADE
ON UPDATE CASCADE
) AUTO_INCREMENT=100001;

INSERT INTO `student`
(student_id, `first_name`, `last_name`, `dob`, `email`)
VALUES (100001, 'Akshay', 'Jori', '1999-07-23', 'akshay@gmail.com');
INSERT INTO `student`
(student_id, `first_name`, `last_name`, `dob`, `email`)
VALUES (100002, 'Rutik', 'Jori', '2001-11-17', 'rutik@gmail.com');
INSERT INTO `student`
(student_id, `first_name`, `last_name`, `dob`, `email`)
VALUES (100005, 'John', 'Doe', '2001-01-11', 'john@gmail.com');

CREATE TABLE course (
course_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
course_name varchar(45) NOT NULL UNIQUE
);

INSERT INTO `course` (course_id, `course_name`) VALUES (1, 'ENGLISH');
INSERT INTO `course` (course_id, `course_name`) VALUES (2, 'MARATHI');
INSERT INTO `course` (course_id, `course_name`) VALUES (3, 'HISTORY');
INSERT INTO `course` (course_id, `course_name`) VALUES (4, 'MATHS');
INSERT INTO `course` (course_id, `course_name`) VALUES (5, 'GEOGRAPHY');

CREATE TABLE registration (
student_id INT NOT NULL,
course_id INT NOT NULL,
PRIMARY KEY (student_id, course_id),
FOREIGN KEY (student_id)
REFERENCES student(student_id)
ON DELETE CASCADE,
FOREIGN KEY (course_id)
REFERENCES course(course_id)
ON DELETE CASCADE
);

INSERT INTO `registration` (`student_id`, `course_id`) VALUES ('100001', '1');
INSERT INTO `registration` (`student_id`, `course_id`) VALUES ('100001', '3');
INSERT INTO `registration` (`student_id`, `course_id`) VALUES ('100001', '4');

INSERT INTO `registration` (`student_id`, `course_id`) VALUES ('100005', '2');
INSERT INTO `registration` (`student_id`, `course_id`) VALUES ('100005', '3');