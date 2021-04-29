const mysql = require('mysql');
const  inquirer = require('inquirer');


const runSearch = () => {
    inquirer
      .prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
          'View All Employees',
          'View All Employees By Role',
          'View All Employees By Department',
          'View All Employees By Manager',
          'Add Employee',
          'Add Role',
          'Add Department',
          'Update Employee Role',
          'Update Employee Manager',
          'Update Employee Department',
          'View Departments by budget',
          'Remove Employee',
          'Remove Role',
          'Remove Department',
          'exit',
        ],
      })
      .then((answer) => {
        switch (answer.action) {
          case 'View All Employees':
            viewEmployees();
            break;
          
          case 'View All Employees By Role':
            employeesByRole();
            break;  

          case 'View All Employees By Department':
            employeeByDept();
            break;
  
          case 'View All Employees By Manager':
            employeeByManager();
            break;
  
          case 'Add Employee':
            addEmployee();
            break;

          case 'Add Role':
            addRole();
            break;
          
          case 'Add Department':
            addRole();
            break; 
            
          case 'Update Employee Role':
            updateEmployeeRole();
            break;
            
          case 'Update Employee Manager':
              updateEmployeeManager();
              break;

          case 'Update Employee Department':
              updateEmployeeDepartment();
              break;
          
          case 'View Department By Budget':
              budget();
              break;

          case 'Remove Employee':
              removeEmployee();
              break;
      

          case 'Remove Role':
              removeRole();
              break;

          case 'Remove Department':
              removeDepartment();
              break
              
          case 'Exit':
            connection.end();
            break;
  
          default:
            console.log(`Invalid action: ${answer.action}`);
            break;
        }
      });
  };

const viewEmployees = () => {
        const query = 'SELECT * FROM eployees:';
        connection.query(query, [answer.emoloyees], (err, res) => {
            if (err) throw err;
            res.forEach(({ employees }) =>
            console.log(`First Name: ${first_name} || Last Name ${last_name}`))
        });
        runSearch();
};

const employeeByDept = () => {
    const query = 'SELECT department, first_name, last_name FROM eployees:';
    connection.query(query, [answer.department.employees], (err, res) => {
        if (err) throw err;
        res.forEach(({ department, employees }) =>
        console.log(`Department: ${department} || First Name: ${first_name} || Last Name ${last_name}`))
    });
    runSearch();
};

const employeeByManager = () => {
  const query = 'SELECT manager_id, first_name, last_name FROM eployees:';
  connection.query(query, [answer.department.employees], (err, res) => {
      if (err) throw err;
      res.forEach(({ manager_id, employees }) =>
      console.log(`Department: ${department} || First Name: ${first_name} || Last Name ${last_name}`))
  });
  runSearch();
};



