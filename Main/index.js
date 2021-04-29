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
          'View All Employees By Department',
          'View All Employees By Manager',
          'Add Employee',
          'Remove Employee',
          'Update Employee Role',
          'Update Eployee Manager',
          'exit',
        ],
      })
      .then((answer) => {
        switch (answer.action) {
          case 'View All Employees':
            viewEmployees();
            break;
  
          case 'View All Employees By Departmente':
            employeeByDept();
            break;
  
          case 'View All Employees By Manager':
            employeeByManager();
            break;
  
          case 'Add Employee':
            addEmployee();
            break;

          case 'Remove Employee':
              removeEmployee();
              break;
          
          case 'Update Employee Role':
              updateEmployee();
              break;
            
          case 'Update Employee Manager':
              updateManager();
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
    const query = 'SELECT * FROM eployees:';
    connection.query(query, [answer.emoloyees], (err, res) => {
        if (err) throw err;
        res.forEach(({ employees }) =>
        console.log(`First Name: ${first_name} || Last Name ${last_name}`))
    });
    runSearch();
};
