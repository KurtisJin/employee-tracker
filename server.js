const mysql = require("mysql");
const inquirer = require("inquirer");
const connection = require("./Main/db/connections.js");
require("console.table");

const runSearch = () => {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Employees By Role",
        "View All Employees By Department",
        "View All Employees By Manager",
        "Add Employee",
        "Add Role",
        "Add Department",
        "Update Employee Role",
        "Update Employee Manager",
        "Update Employee Department",
        "View Departments by budget",
        "Remove Employee",
        "Remove Role",
        "Remove Department",
        "exit",
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case "View All Employees":
          viewEmployees();
          break;

        case "View All Employees By Role":
          employeesByRole();
          break;

        case "View All Employees By Department":
          employeeByDept();
          break;

        case "View All Employees By Manager":
          employeeByManager();
          break;

        case "Add Employee":
          addEmployee(answer);
          break;

        case "Add Role":
          addRole();
          break;

        case "Add Department":
          addDepartment();
          break;

        case "Update Employee Role":
          updateEmployeeRole();
          break;

        case "Update Employee Manager":
          updateEmployeeManager();
          break;

        case "Update Employee Department":
          updateEmployeeDepartment();
          break;

        case "View Department By Budget":
          budget();
          break;

        case "Remove Employee":
          removeEmployee();
          break;

        case "Remove Role":
          removeRole();
          break;

        case "Remove Department":
          removeDepartment();
          break;

        case "Exit":
          connection.end();
          break;

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};

const viewEmployees = () => {
  const query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name FROM employee LEFT JOIN role ON role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id;"
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res)
    runSearch();
  });

};

const employeesByRole = () => {
  const query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name FROM employee LEFT JOIN role ON role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id;";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res)
    runSearch();
  });
};

const employeeByDept = () => {
  const query = `SELECT employee.id, employee.first_name, employee.last_name, department.name FROM employee LEFT JOIN role ON role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id;`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res)
    runSearch(); 
  });
};

const employeeByManager = () => {
  const query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, manager_id FROM employee LEFT JOIN role ON role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id"; 
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res)
    runSearch(); 
  });
 
};

const addEmployee = () => {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the employee's first name?",
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the employee's last name?",
      },
      {
        name: "roleName",
        type: "input",
        message: "What is the Employee's Role?",
      },
      {
        name: "managerID",
        type: "input",
        message: "What is the Employees Manager ID?",
      },
      // {
      //   name: "managerID",
      //   type: "input",
      //   message: "What is the Employees Manager ID?",
      //   choices: [{name: 'engineering', value: 4}]
      // }
    ])
    .then((answer) => {
      // console.log(answer);
      let firstName = answer.firstName;
      let lastName = answer.lastName;
      let roleName = answer.roleName;
      let managerID = answer.managerID;
      const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ('${firstName}', '${lastName}', '${roleName}', '${managerID}')`;
      connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        runSearch();
      });
      
    });
  
};

const addRole = () => {

  inquirer
    .prompt([
      {
        name: "addTitle",
        type: "input",
        message: "What is the Title of the Role you would like to add?",
      },
      {
        name: "addSalary",
        type: "input",
        message: "What is the Salary you would like to add?",
      },
      {
        name: "addDepartment",
        type: "input",
        message: "What is the Department you would like to add?",
      },        
    ])
    .then(function(res) {
      const title = res.title;
      const salary = res.salary;
      const departmentID = res.departmentID;
      const query = `INSERT INTO role (title, salary, department_id) VALUE ("${title}", "${salary}", "${departmentID}")`;
      connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        start();
      });
    });
};

const updateEmployeeRole = () => {
  const query = connection.query(`UPDATE role SET ? WHERE ?`, (err, res) => {
    if (err) throw err;
    console.log(
      `${res.affectedRows} role for the employee has been updated!\n`
    );
  });

  // logs the actual query being run
  console.log(query.sql);
};

const updateEmployeeManager = () => {


};

const updateEmployeeDepartment = () => {


};

const budget = () => {
    const query = connection.query(`SELECT department_id AS id, department.department_name AS department,SUM(salary) AS budget FROM role INNER JOIN department ON role.department_id = department.id GROUP BY role.department_id`, (err, res) => {
    if (err) throw err;
      console.table(res);
      runSearch();
  });
};

const removeEmployee = () => {
  connection.query(`DELETE FROM employees WHERE `, (err, res) => {
    if (err) throw err;
    console.log(`${res.affectedRows} products deleted!\n`);
    // Call readProducts AFTER the DELETE completes
  });
  runSearch();
};

const removeRole = () => {


};

const removeDepartment = () => {


};

/***************** FUNCTION CALLS ********************/

runSearch();
