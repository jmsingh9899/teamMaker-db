INSERT INTO department(name)
VALUES  ("Sales"),
        ("Design"),
        ("Finance");

INSERT INTO roles(title, salary, department_id)
VALUES  ("Sales Lead", 80000, 1),
        ("Sales Intern", 40000, 1),
        ("Design Lead", 100000, 2),
        ("Design Intern", 50000, 2),
        ("Finance Lead", 120000, 3),
        ("Finance Intern", 60000,3);

INSERT INTO employees(first_name, last_name, role_id, manager_id)
    VALUES  ("Bod", "Dylan", 1, NULL),
            ("Jimmy", "Bond", 1, 1),
            ("Jac", "Daniels", 2, 1),
            ("Rob", "Downey", 3, NULL),
            ("Chris", "Patt", 4, 4),
            ("Orange", "Bloom", 5, NULL),
            ("Jim", "Bond", 1, 1),
            ("Kevvy", "Hart", 6, 6);
