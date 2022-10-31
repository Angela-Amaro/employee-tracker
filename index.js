const inquirer = require('inquirer');
const mysql2 = require('mysql2');
const express = require('express');


    import inquirer from 'inquirer';
import { allowedNodeEnvironmentFlags } from 'process';
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'startMenu',
            message: 'What would you like to do?',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role'],
        },

    ])
    .then((answers) => {
        switch(answers.departmentAdd) {
            case "department":
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'departmentName',
                        message: 'What is the new departments name?'
                    },
                ])
                .then(answer => {
                    const newDepartment = new department(answer.departmentName);
                    department_db.department(newDepartment);
                    addDepartment();
                })
                break;
            case "role":
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'name',
                        message: 'Enter role name',
                    },
                    {
                        type: 'input',
                        name: 'salary',
                        message: 'Enter salary for this role'
                    },
                    {
                        //should this be list  instead?
                        type: 'input',
                        name: 'department',
                        message: 'What department is this role a part of?'
                    }])
                    .then(answer => {
                        const newRole = new role(answer.name, answer.salary, answer.department);
                        role_db.employee_role(newRole);
                        allowedNodeEnvironmentFlags();
                        return "The role has been added!"
                    })
                    break;
                    case "employee":
                        inquirer.prompt([
                            {
                                type: 'input',
                                name: 'firstName',
                                message: 'Enter the first name of the employee'
                            },
                            {
                                type: 'input',
                                name: 'lastName',
                                message: 'Enter the last name of the employee'
                            },
                            {
                                type: 'input',
                                name: 'empRole',
                                message: 'Enter the employees role',
                            },
                            {
                                type: 'input',
                                name: 'manager',
                                message: 'Who is the employees manager? if no manger'
                            }

                        ])
        }
      // Use user feedback for... whatever!!
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });


    // create the connection to database
const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db'
  });
  
  // simple query
  connection.query(
    'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45',
    function(err, results, fields) {
      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available
    }
  );
  
  // with placeholder
  connection.query(
    'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
    ['Page', 45],
    function(err, results) {
      console.log(results);
    }
  );

  // Query database
db.query('SELECT * FROM students', function (err, results) {

    if(results){
      results.forEach(function(student){
      console.log(student)
    })
    }
    
  });

  // Query database
db.query('SELECT * FROM students', function (err, results) {
    console.log("********* SELECT * FROM students results[0]");
    console.log(results[0]);
    console.log("*********");
  });
  
  db.query('SELECT first_name, last_name FROM students', function (err, results) {
    console.log("********* SELECT first_name, last_name FROM students");
    console.log(results);
    console.log("*********");
  });
