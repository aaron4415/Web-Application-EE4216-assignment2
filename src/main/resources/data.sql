-- 
--  Author:  vanting
--  Created: 4 Mar 2023
-- 
--  Spring Boot will automatically pick up this file and run it against an embedded 
--  in-memory database, such as our configured H2 instance. 

INSERT INTO ToDoListItems VALUES
(10001, '4216 hw1', 'pending'),
(10002, '4216 hw2', 'pending'),
(10003, 'exam review', 'pending'),
(10004, 'test1', 'pending');

INSERT INTO Auth VALUES
( 'testuser', '123456');


-- INSERT INTO grades VALUES
-- (123, 10001, 'B-'),
-- (123, 10002, 'C'),
-- (456, 10001, 'B+'),
-- (888, 10002, 'A+'),
-- (888, 10003, 'A+'),
-- (404, 10004, 'D+'),
-- (404, 10002, 'B'),
-- (456, 10002, 'D-');
-- 
-- INSERT INTO students VALUES
-- (123, 'Bart', 'bart@fox.com', 'bartman'),
-- (404, 'Ralph', 'ralph@fox.com', 'catfood'),
-- (456, 'Milhouse', 'milhouse@fox.com', 'fallout'),
-- (888, 'Lisa', 'lisa@fox.com', 'vegan');
-- 
-- INSERT INTO teachers VALUES
-- (1234, 'Krabappel'),
-- (5678, 'Hoover'),
-- (9012, 'Stepp');

-- debug output to just show the contents of all tables

/*SHOW TABLES;
SELECT * FROM courses;
SELECT * FROM grades;
SELECT * FROM students;
SELECT * FROM teachers;*/
