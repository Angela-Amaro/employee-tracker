const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'department_db',
});

function displayStartMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "startMenu",
        message: "What would you like to do?",
        choices: [
          "view all departments",
          "view all roles",
          "view all employees",
          "add a department",
          "add a role",
          "add an employee",
          "update an employee role",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.startMenu) {
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
}
function departmentView() {
  db.query("SELECT * FROM department", function (err, results) {
    console.table(results);
    displayStartMenu();
  });
}

function roleView() {
  db.query("SELECT * FROM roll", function (err, results) {
    console.table(results);
    displayStartMenu();
  });
}

function empView() {
  db.query(
    `SELECT employee.id, employee.first_name, employee.last_name, roll.roll_title, department.department_name AS department,
  CONCAT (manager.first_name, ' ', manager.last_name) AS manager
  FROM employee
  JOIN roll  ON employee.employee_id = roll.id 
  JOIN department ON roll.department_id = department.id 
  LEFT JOIN employee AS manager ON manager.id = employee.manager_id;
  `,
    function (err, results) {
      console.table(results);
      displayStartMenu();
    }
  );
}

function departmentAdd() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "departmentAdd",
        message: "What is the new departments name?",
      },
    ])
    .then((answer) => {
      const departmentSql =
        "INSERT INTO departments (department_name) VALUES (?);";
      db.query(departmentSql, answer.departmentAdd, (err, result) => {
        if (err) throw err;
        departmentView();
      });
    });
}

function roleAdd() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "newRole",
        message: "Which role would you like to add?",
      },
      {
        type: "input",
        name: "newSalary",
        message: "What is the salary of this role?",
      },
    ])
    .then(function (answer) {
      const params = [answer.newRole, answer.newSalary];

      const rolSql = "SELECT department_name, id FROM department;";

      db.query(rolSql, (err, data) => {
        if (err) throw err;

        const dpt = data.map(({ department_name, department_id }) => ({
          name: department_name,
          value: department_id,
        }));

        inquirer
          .prompt([
            {
              type: "list",
              name: "dept",
              message: "What department is this role in?",
              choices: dpt,
            },
          ])
          .then((dptChoice) => {
            const dpt = dptChoice.dpt;
            params.push(dpt);

            const newRoleSql =
              "INSERT INTO roles (roll_title,salary,department_id) VALUES (?,?,?)";

            db.query(newRoleSql, params, (err, result) => {
              if (err) throw err;
              roleView();
            });
          });
      });
    });
}

function empAdd() {
  inquirer
    .prompt([
      {
        name: "newFirst",
        message: "Enter your new employee's first name",
      },
      {
        name: "newLast",
        message: "Enter your new employee's last name",
      },
    ])
    .then(function (answer) {
      const params = [answer.newFirst, answer.newLast];
      const rolSql = "SELECT roll.id, roll_title FROM roll;";
      db.query(rolSql, (err, data) => {
        if (err) throw err;

        const roles = data.map(({ id, roll_title }) => ({
          name: roll_title,
          value: id,
        }));

        inquirer
          .prompt([
            {
              type: "list",
              name: "role",
              message: "What is the new employee's role?",
              choices: roles,
            },
          ])
          .then(function (newRoleChoice) {
            const newRol = newRoleChoice.role;
            params.push(newRol);

            const newMngrSql =
              "SELECT manager.id, manager.first_name, manager.last_name FROM employee JOIN employee as manager on manager.id = employee.manager_id";
            db.query(newMngrSql, (err, data) => {
              const manager = data.map(({ id, first_name, last_name }) => ({
                name: first_name + " " + last_name,
                value: id,
              }));
              inquirer
                .prompt([
                  {
                    type: "list",
                    name: "manager",
                    message: "Who is your employees manager",
                    choices: manager,
                  },
                ])
                .then(function (empManager) {
                  const managerChoice = empManager.manager;
                  params.push(managerChoice);

                  const empSql =
                    "INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES (?,?,?,?);";
                  db.query(empSql, params, (err, result) => {
                    if (err) throw err;
                    empView();
                  });
                });
            });
          });
      });
    });
}
function updateRole() {
  const updateSql = "INSERT INTO roll (role_name) VALUES (?);";
  db.update(updateSql, (err, result) => {
    if (err) throw err;
    roleAdd();
    db_con.connect((err) => {
      if (err) {
        console.log("Database Connection Failed !!!", err);
        return;
      }
    });
  });
}
//console.log("We are connected to gfg_db database");

//Creating Query
//let query = "UPDATE publishers SET salary=0";

//Executing Query
//db_con.query(query, (err, rows) => {
//if(err) throw err;
//console.log(rows);
//});
//);

//create the connection to database

displayStartMenu();
