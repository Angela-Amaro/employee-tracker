const inquirer = require('inquirer');
const mysql2 = require('mysql2');
const tables = require('console.table');

function displayStartMenu() {
  inquirer
    .prompt([
      {
      type: 'list',
      name: 'startMenu',
      message: 'What would you like to do?',
      choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role'],
      },

    ])
.then((answer) => {
  switch(answer.startMenu) {
    case "view all departments":
      departmentView();
    break;
    case "view all roles":
      roleView();
    break;
    case "view all employees":
      empView();
    break;
    case "add a department":
      departmentAdd();
    break;
    case "add a role":
      roleAdd();
    break;
    case "add an employee":
      empAdd();      
    break;
    case "update an employee role":
      updateRole();
    break;            
  }
  })
    .catch((error) => {
      if (error.error) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
function departmentView () {
  db.query('SELECT * FROM department', function (err, results) {
    console.table(results);
    displayStartMenu();
})};

function roleView() {
  db.query('SELECT * FROM roll', function (err, results) {
    console.table(results);
    displayStartMenu();
})};
function empView() {
  db.query('SELECT * FROM employee', function (err, results) {
    console.table(results);
    displayStartMenu();
})};
}
  function departmentAdd() {
  inquirer.prompt([
    {
        type: 'input',
        name: 'departmentAdd',
        message: 'What is the new departments name?'
    },
])
.then(answer => {
  const departmentSql = 'INSERT INTO departments (department_name) VALUES (?);'
  db.query(departmentSql, answer.departmentAdd, (err,result) => {
      if (err) throw err;
      departmentView();
})}; 
 
 function roleAdd() {
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
    //add several items to table
    const roleSql = 'INSERT INTO departments (role_name) VALUES (?);'
    db.query(roleSql, answer.roleAdd, (err,result) => {
        if (err) throw err;
        roleAdd();
      
  })
  console.log ("The role has been added!");
 });

function employeeAdd() {
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
        message: 'Who is the employees manager? if no manger leave empty'
    },
])
.then(answer => {
  //concatinate first name and last name
  const empSql = 'INSERT INTO departments (role_name) VALUES (?);'
  db.query(empSql, answer.empAdd, (err,result) => {
      if (err) throw err;
      roleAdd();
})
function updateRole() {
  const updateSql = 'INSERT INTO roll (role_name) VALUES (?);'
  db.update(updateSql, , (err,result) => {
      if (err) throw err;
      roleAdd();
    //   db_con.connect((err) => {
    //     if (err) {
    //       console.log("Database Connection Failed !!!", err);
    //       return;
    //     }
      
    //     console.log("We are connected to gfg_db database");
      
    //     // Creating Query
    //     let query = "UPDATE publishers SET salary=0";
      
    //     // Executing Query
    //     db_con.query(query, (err, rows) => {
    //         if(err) throw err;
    //         console.log(rows);
    //     });
    // });
inquirer.prompt([
  {
 
  },
])
}
    // create the connection to database
    const connection = mysql2.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'db'
    });

  displayStartMenu();
