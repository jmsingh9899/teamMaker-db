DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

use company_db;

CREATE TABLE department(
    id INT NOT NULL auto_increment primary key,
    name VARCHAR(30)
);

CREATE TABLE roles(
    id INT NOT NULL auto_increment primary key,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE employees(
    id INT NOT NULL auto_increment primary key,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id)
    REFERENCES roles(id)
    ON DELETE SET NULL,
    FOREIGN KEY (manager_id)
    REFERENCES employees(id)
    ON DELETE SET NULL
);
