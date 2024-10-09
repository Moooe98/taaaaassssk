-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS crud;

-- Use the newly created database
USE crud;

-- Drop the student table if it exists
DROP TABLE IF EXISTS student;

-- Create the student table
CREATE TABLE student (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL
);
