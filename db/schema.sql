DROP TABLE IF EXISTS employee;
DROP TABLE IF         role;
DROP TABLE IF EXISTS departments;

CREATE TABLE departments (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL,
    department_id VARCHAR(30) NOT NULL,
    description TEXT
);

CREATE TABLE role (
id INTEGER AUTO_INCREMENT PRIMARY KEY,
    tittle VARCHAR(30) NOT NULL,
    department_id VARCHAR(30) INTEGER NOT NULL,
    salary DECIMAL(8.0) NOT NULL
   
);

CREATE TABLE employee (
id INTEGER AUTO_INCREMENT PRIMARY KEY,
   roll id  INTEGER,
   first_name VARCHAR(30) NOT NULL,
   last_name VARCHAR(30) NOT NULL,
    manager_id INTEGER,
);

