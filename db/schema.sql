DROP DATABASE IF EXISTS department_db;
CREATE DATABASE department_db;

USE department_db;

CREATE TABLE department (
  id INT PRIMARY KEY,
  -- why is name not white
  name VARCHAR(30)
);


CREATE TABLE roll (
    id INT PRIMARY KEY,

    title VARCHAR(30),

    salary DECIMAL,

    department_id INT,
);


CREATE TABLE employee (
  id INT PRIMARY KEY,

 first_name VARCHAR(30),

 last_name VARCHAR(30),

 role_id INT,
 --make null if no manager
 manager_id INT DEFAULT 'Null' ,
);

USE department_db;
SELECT * FROM department;

USE role_db;
SELECT * FROM employee_role;

USE employee_db;
SELECT * FROM emplyee;