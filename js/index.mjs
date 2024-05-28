import pg from 'pg';
import inquirer from 'inquirer';
import consoleTable from 'console.table';

const { Client } = pg;

// Create a connection to the database
const client = new Client({
  host: 'localhost',
  user: 'postgres',
  password: 'password',
  database: 'company'
});

// Connect to the database
client.connect(err => {
  if (err) throw err;
  console.log('Connected to the database.');
  mainMenu();
});

// Main menu function
function mainMenu() {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
      ]
    })
    .then(answer => {
      switch (answer.action) {
        case 'View all departments':
          viewAllDepartments();
          break;
        case 'View all roles':
          viewAllRoles();
          break;
        case 'View all employees':
          viewAllEmployees();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Update an employee role':
          updateEmployeeRole();
          break;
        case 'Exit':
          client.end();
          break;
      }
    });
}

// Function to view all departments
function viewAllDepartments() {
  const query = 'SELECT * FROM department';
  client.query(query, (err, res) => {
    if (err) throw err;
    console.table(res.rows);
    mainMenu();
  });
}

// Function to view all roles
function viewAllRoles() {
  const query = `
    SELECT role.id, role.title, department.name AS department, role.salary
    FROM role
    INNER JOIN department ON role.department_id = department.id
  `;
  client.query(query, (err, res) => {
    if (err) throw err;
    console.table(res.rows);
    mainMenu();
  });
}

// Function to view all employees
function viewAllEmployees() {
  const query = `
    SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, 
           CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON manager.id = employee.manager_id
  `;
  client.query(query, (err, res) => {
    if (err) throw err;
    console.table(res.rows);
    mainMenu();
  });
}

// Function to add a department
function addDepartment() {
  inquirer
    .prompt({
      name: 'name',
      type: 'input',
      message: 'Enter the name of the department:'
    })
    .then(answer => {
      const query = 'INSERT INTO department (name) VALUES ($1)';
      client.query(query, [answer.name], (err, res) => {
        if (err) throw err;
        console.log(`Department added: ${answer.name}`);
        mainMenu();
      });
    });
}

// Function to add a role
function addRole() {
  inquirer
    .prompt([
      {
        name: 'title',
        type: 'input',
        message: 'Enter the title of the role:'
      },
      {
        name: 'salary',
        type: 'input',
        message: 'Enter the salary for the role:'
      },
      {
        name: 'department_id',
        type: 'input',
        message: 'Enter the department ID for the role:'
      }
    ])
    .then(answer => {
      const query = 'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)';
      client.query(query, [answer.title, answer.salary, answer.department_id], (err, res) => {
        if (err) throw err;
        console.log(`Role added: ${answer.title}`);
        mainMenu();
      });
    });
}

// Function to add an employee
function addEmployee() {
  inquirer
    .prompt([
      {
        name: 'first_name',
        type: 'input',
        message: 'Enter the first name of the employee:'
      },
      {
        name: 'last_name',
        type: 'input',
        message: 'Enter the last name of the employee:'
      },
      {
        name: 'role_id',
        type: 'input',
        message: 'Enter the role ID for the employee:'
      },
      {
        name: 'manager_id',
        type: 'input',
        message: 'Enter the manager ID for the employee:'
      }
    ])
    .then(answer => {
      const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)';
      client.query(query, [answer.first_name, answer.last_name, answer.role_id, answer.manager_id], (err, res) => {
        if (err) throw err;
        console.log(`Employee added: ${answer.first_name} ${answer.last_name}`);
        mainMenu();
      });
    });
}

// Function to update an employee role
function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        name: 'employee_id',
        type: 'input',
        message: 'Enter the ID of the employee to update:'
      },
      {
        name: 'role_id',
        type: 'input',
        message: 'Enter the new role ID for the employee:'
      }
    ])
    .then(answer => {
      const query = 'UPDATE employee SET role_id = $1 WHERE id = $2';
      client.query(query, [answer.role_id, answer.employee_id], (err, res) => {
        if (err) throw err;
        console.log(`Employee updated: ${answer.employee_id}`);
        mainMenu();
      });
    });
}