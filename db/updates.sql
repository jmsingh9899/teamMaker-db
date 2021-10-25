-- Shows department:
-- SELECT * FROM department;


-- Shows roles infromation and department: 
-- SELECT roles.id, roles.title,department.name as department, roles.salary 
-- FROM roles
-- JOIN department ON roles.department_id = department.id;






-- THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
-- SELECT employee.id, employee.first_name, employee.last_name,  roles.title, roles.salary, department.name as department, concat (manager.first_name, " ", manager.last_name) as manager
-- FROM employees as employee
-- JOIN roles on employee.role_id = roles.id
-- JOIN department ON roles.department_id = department.id
-- LEFT JOIN employees as manager 
-- ON employee.manager_id = manager.id
-- ORDER BY employee.id;

-- Updates Manager:
-- UPDATE employees SET manager_id = ? WHERE id = ?;

-- Updates Role:
-- UPDATE employees SET role_id = ? WHERE id = ?;

-- SHOWS EMPLOYEES BY MANAGER:
-- SELECT  manager.id, concat (manager.first_name, " ", manager.last_name) as manager, employee.id, concat (employee.first_name, employee.last_name) AS employee
-- FROM employees as employee
-- JOIN employees as manager 
-- ON employee.manager_id = manager.id
-- ORDER BY manager;


-- Returns employees by departement
-- SELECT concat (employees.first_name, employees.last_name) AS employee, department.name as department
-- FROM employees 
-- JOIN roles on employees.role_id = roles.id
-- JOIN department ON roles.department_id = department.id
-- ORDER BY department.name;

-- Delete function
-- DELETE FROM (?) WHERE (? = ?);

-- Shows departments utilized budget
SELECT  department.name AS department, SUM(roles.salary) AS 'Utilized Budget'
FROM employees
JOIN roles on employees.role_id = roles.id
JOIN department ON roles.department_id = department.id
WHERE roles.department_id = 3;