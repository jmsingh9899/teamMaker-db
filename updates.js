//Shows department:
const util = require('util');
const showDepartments = 'SELECT * FROM department;';


//Shows roles infromation and department: 
const showRoles = 'SELECT roles.id, roles.title,department.name as department, roles.salary FROM roles JOIN department ON roles.department_id = department.id ORDER BY roles.id;';






// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
const showEmployeesInfo = 'SELECT employee.id, employee.first_name, employee.last_name,  roles.title, roles.salary, department.name as department, concat (manager.first_name, " ", manager.last_name) as manager FROM employees as employee JOIN roles on employee.role_id = roles.id JOIN department ON roles.department_id = department.id LEFT JOIN employees as manager ON employee.manager_id = manager.id ORDER BY employee.id;';

// Updates Manager:
const updateManager = (manager, employee) => `UPDATE employees SET manager_id = ${manager} WHERE id = ${employee};`;

// Updates Role:
const updateRole = (role, employee) => `UPDATE employees SET role_id = ${role} WHERE id = ${employee};`;

// SHOWS EMPLOYEES BY MANAGER:
const showEmployeesbyManager = 'SELECT  manager.id, concat (manager.first_name, " ", manager.last_name) as manager, employee.id, concat (employee.first_name, " " ,employee.last_name) AS employee FROM employees as employee JOIN employees as manager ON employee.manager_id = manager.id ORDER BY manager;';


// Returns employees by departement
const showEmployeesbyDepartment = 'SELECT concat (employees.first_name, " ",employees.last_name) AS employee, department.name as department FROM employees JOIN roles on employees.role_id = roles.id JOIN department ON roles.department_id = department.id ORDER BY department.name;';

// Delete function
const deleteRow = (table, value) =>`DELETE FROM ${table} WHERE  id= ${value};`;


// Shows departments utilized budget
const showDepartmentBudget = (departmentId) => `SELECT  department.name AS department, SUM(roles.salary) AS "Utilized Budget" FROM employees JOIN roles on employees.role_id = roles.id JOIN department ON roles.department_id = department.id WHERE roles.department_id = ${departmentId};`;

const addDepartment = (departmentName) => `INSERT INTO department(name) VALUES ("${departmentName}")`;

const addRole = (roleTitle, roleSalary, roleDepartmentId) => `INSERT INTO roles(title, salary, department_id) VALUES ("${roleTitle}", ${roleSalary}, ${roleDepartmentId})`;

const addEmployee = (firstName, lastName, roleId, managerId ) => `INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", ${roleId}, ${managerId})`;

module.exports = { showDepartments, showRoles, showEmployeesInfo, updateManager, updateRole, showEmployeesbyManager, showEmployeesbyDepartment, deleteRow,showDepartmentBudget, addDepartment, addRole, addEmployee }