DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;
USE employees;


CREATE TABLE departments (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(30) UNIQUE NOT NULL,
    
);

CREATE TABLE role (
id INTEGER AUTO_INCREMENT PRIMARY KEY,
    tittle VARCHAR(30) NOT NULL,
    department_id VARCHAR(30) INTEGER NOT NULL,
    salary DECIMAL(8.0) NOT NULL,
   INDEX dep_ind (department_id),
   CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
);

CREATE TABLE employee (
id INTEGER AUTO_INCREMENT PRIMARY KEY,
   first_name VARCHAR(30) NOT NULL,
   last_name VARCHAR(30) NOT NULL,
   roll_id  INTEGER,
   INDEX role_ind (role_id),
   CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
    manager_id INTEGER,
    INDEX man_ind (manager_id),
   CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE CASCADE
);

