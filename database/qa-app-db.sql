
-- making and using a database with 2 tables: questions and answers
DROP DATABASE IF EXISTS qa_app;
CREATE DATABASE IF NOT EXISTS qa_app;
USE qa_app;

-- questions table, auto incrementing id so we dont have to handle it in JS.
CREATE TABLE IF NOT EXISTS questions (
 id INT auto_increment,
 title varchar(500) COLLATE utf8_unicode_ci NOT NULL,
 summary varchar(500) COLLATE utf8_unicode_ci NOT NULL,
 author VARCHAR(100) NOT NULL,
	CONSTRAINT PRIMARY KEY pk_questions(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- answers id, question id references questions table
CREATE TABLE IF NOT EXISTS answers (
	`q_id` INT,
    `answer` VARCHAR(500),
    
    CONSTRAINT fk_question FOREIGN KEY(q_id) REFERENCES questions(id)
) ENGINE = InnoDB;

