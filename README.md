# SH Nodejs capstone project-2 

### Guiede to create database
CREATE database sh_nodejs_cap2;

### Guide to create table users
CREATE table users (user_id INT NOT NULL AUTO_INCREMENT, first_name VARCHAR(25), last_name VARCHAR(25), email VARCHAR(30), password VARCHAR(8), phone VARCHAR(14), address VARCHAR(100), is_admin TINYINT(1), PRIMARY KEY(user_id));

