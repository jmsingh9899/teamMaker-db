const inquirer = require('inquirer');
const consoleTable = require('console.table');
const mysql = require('mysql2');
const { showDepartments, showRoles, showEmployeeInfo, updateManager, updateRole, showEmployees, showEmployeesbyDepartment, deleteRow,showDepartmentBudget } = require('./updates');


const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'password',
        database: 'movie_db',
    },
    console.log(`Connected to the registar_db database.`)
);

inquirer.prompt([
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            "View all Employeees",
            "View Employee by Manager",
            "View Employee by Department",
            "Update Employee Role",
            "Update Empployee Manager",
            "Add Employee",
            "Remove Employee",
            "View Roles",
            "Add Role",
            "Remove Role",
            "View Departments",
            "Add Departement",
            "Remove Department"

        ]
    }
])