DROP DATABASE IF EXISTS department_db;
CREATE DATABASE department_db;

USE department_db;

CREATE TABLE department (
  id INT AUTO_INCREMENT PRIMARY KEY,
  -- why is name not white
  department_name VARCHAR(30) NOT NULL
);


CREATE TABLE roll (
    id INT AUTO_INCREMENT PRIMARY KEY,

    title VARCHAR(30) NOT NULL,

    salary DECIMAL NOT NULL,

    department_id INT,

    FOREIGN KEY(department_id) REFERENCES department(id)
);


CREATE TABLE employee (
  id INT PRIMARY KEY AUTO_INCREMENT,

 first_name VARCHAR(30),

 last_name VARCHAR(30),

 role_id INT,
 FOREIGN KEY (role_id) REFERENCES roll(id)
  --make null if no manager
 manager_id INT NULL ,
 FOREIGN KEY (manager_id) REFERENCES employee(id)
);

USE department_db;
SELECT * FROM department;

USE role_db;
SELECT * FROM employee_role;

USE employee_db;
SELECT * FROM emplyee;