DROP DATABASE IF EXISTS work;
CREATE DATABASE work;
USE work;

CREATE TABLE department_table (
    id INT AUTO_INCREMENT,
    dep_Name VARCHAR(30),
    PRIMARY KEY(id)
);

CREATE TABLE role_table (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL(11,2),
    department_id INT,
    FOREIGN KEY(department_id)
    REFERENCES department_table(id)
);

CREATE TABLE employees_table (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY(role_id)
    REFERENCES role_table(id)
);