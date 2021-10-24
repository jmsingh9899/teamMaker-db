const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');
const { showDepartments, showRoles, showEmployeesInfo, updateManager, updateRole, showEmployeesbyManager, showEmployeesbyDepartment, deleteRow, showDepartmentBudget, addDepartment, addRole, addEmployee } = require('./updates');
const { ModalActions } = require('semantic-ui-react');
var employed = [];
var role = [];
const findNum = (x) => {
    return x.match(/\d+/);
}

const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'password',
        database: 'company_db',
    },
    console.log(`Connected to the registar_db database.`)
);

const getEmloyeesInfo = () => db.query(showEmployeesInfo, (err, data) => {
    if (err) {
        throw err
    } else {
        console.table(data)
        companyDB();
    }
}
);

const getDepartments = () => db.query(showDepartments, (err, data) => {
    if (err) {
        throw err
    } else {
        console.table(data)
        companyDB();
    }
}
);

const getRoles = () => db.query(showRoles, (err, data) => {
    if (err) {
        throw err
    } else {
        console.table(data)
        companyDB();
    }
}
);


const changeManager = () => {
    db.query(showEmployeesInfo, (err, data) => {
        if (err) {
            throw err
        } else {
            for (i = 0; i < data.length; i++) {
                employed.push(data[i].first_name.concat(' ', data[i].last_name, ' ', data[i].id))
            }
        }
        inquirer.prompt([
            {
                type: 'list',
                message: 'Which Employee Would you like to update',
                name: 'employee',
                choices: employed
            }
        ]).then((res) => {
            const selectedId = parseInt(res.employee.split(' ')[2]);
            inquirer.prompt([
                {
                    type: 'list',
                    message: 'Who do you want to make their manager',
                    name: 'employee',
                    choices: employed
                }
            ]).then((res => {
                const selectedManger = parseInt(res.employee.split(' ')[2]);
                db.query(updateManager(selectedManger, selectedId), (err, data) => {
                    if (err) {
                        throw err
                    } else {
                        console.log("Manager updated");
                        companyDB();
                    }
                });
            }))
        })
    })
};

const changeRole = () => {
    db.query(showEmployeesInfo, (err, data) => {
        if (err) {
            throw err
        } else {
            for (i = 0; i < data.length; i++) {
                employed.push(data[i].first_name.concat(' ', data[i].last_name, ' ', data[i].id))
            }
        }
        db.query(showRoles, (err, data) => {
            if (err) {
                throw err
            } else {
                for (i = 0; i < data.length; i++) {
                    role.push(data[i].title.concat(' ', data[i].id))
                }
            }
            inquirer.prompt([
                {
                    type: 'list',
                    message: 'Which Employee role would you like to update',
                    name: 'employee',
                    choices: employed
                }
            ]).then((res) => {
                const selectedId = parseInt(res.employee.split(' ')[2]);
                inquirer.prompt([
                    {
                        type: 'list',
                        message: 'What would you like to make their role',
                        name: 'role',
                        choices: role
                    }
                ]).then((res => {
                    const number = res.role.split(' ').findIndex(findNum)
                    const selectedRole = parseInt(res.role.split(' ')[number]);
                    db.query(updateRole(selectedRole, selectedId), (err, data) => {
                        if (err) {
                            throw err
                        } else {
                            console.log("Role Updated");
                            companyDB();
                        }
                    });
                }))
            })
        })
    })
}

const addEmp = () => {
    db.query(showEmployeesInfo, (err, data) => {
        if (err) {
            throw err
        } else {
            for (i = 0; i < data.length; i++) {
                employed.push(data[i].first_name.concat(' ', data[i].last_name, ' ', data[i].id))
            }
            employed.push('No manager assigned')
        }
        db.query(showRoles, (err, data) => {
            if (err) {
                throw err
            } else {
                for (i = 0; i < data.length; i++) {
                    role.push(data[i].title.concat(' ', data[i].id))
                }
            }
            inquirer.prompt([
                {
                    type: 'input',
                    message: 'What is their first name?',
                    name: 'firstName'
                },
                {
                    type: 'input',
                    message: 'What is their last name',
                    name: 'lastName'
                },
                {
                    type: 'list',
                    message: 'What is their title',
                    name: 'title',
                    choices: role
                },
                {
                    type: 'list',
                    message: 'Who is their Manager',
                    name: 'manager',
                    choices: employed

                }
            ]).then((res) => {
                const number = res.title.split(' ').findIndex(findNum)
                const selectedTitle = parseInt(res.title.split(' ')[number]);
                const manager = res.manager.split(' ').findIndex(findNum);
                var selectedManager = parseInt(res.manager.split(' ')[manager]);
                if (manager == -1) {
                    db.query(addEmployee(res.firstName, res.lastName, selectedTitle, null), (err, data) => {
                        if (err) {
                            throw err
                        } else {
                            console.log('Employee added.')
                            companyDB();
                        }
                    })
                } else {
                    db.query(addEmployee(res.firstName, res.lastName, selectedTitle, selectedManager), (err, data) => {
                        if (err) {
                            throw err
                        } else {
                            console.log('Employee added.')
                            companyDB();
                        }
                    })
                }

            })
        })
    })

};
const addRole = () => {
    
};


const getEmloyeesbyManager = () => db.query(showEmployeesbyManager, (err, data) => {
    if (err) {
        throw err
    } else {
        console.table(data)
        companyDB();
    }
}
);

const getEmloyeesbyDepartement = () => db.query(showEmployeesbyDepartment, (err, data) => {
    if (err) {
        throw err
    } else {
        console.table(data)
        companyDB();
    }
}
);

const removeEmp = () => {
    db.query(showEmployeesInfo, (err, data) => {
        if (err) {
            throw err
        } else {
            for (i = 0; i < data.length; i++) {
                employed.push(data[i].first_name.concat(' ', data[i].last_name, ' ', data[i].id))
            }
            inquirer.prompt([
                {
                    type: 'list',
                    message: 'Who would you like to remove',
                    name: 'removed',
                    choices: employed
                }
            ]).then((res) => {
                const number = res.removed.split(' ').findIndex(findNum)
                const selectedEmployee = parseInt(res.removed.split(' ')[number]);
                db.query(deleteRow('employees', selectedEmployee), (err, data) => {
                    if (err) {
                        throw err
                    } else {
                        console.log('Employee Removed')
                        companyDB();
                    }
                })
            })
        }
    });
}

const companyDB = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'action',
            choices: [
                "View all Employeees",
                "View Employee by Manager",
                "View Employee by Department",
                "Update Employee Manager",
                "Update Employee Role",
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
    ]).then((response) => {
        switch (response.action) {
            case "View all Employeees":
                getEmloyeesInfo();
                break;
            case "View Employee by Manager":
                getEmloyeesbyManager();
                break;
            case "View Employee by Department":
                getEmloyeesbyDepartement();
                break;
            case "Update Employee Role":
                changeRole();
                break;
            case "Update Employee Manager":
                changeManager();
                break;
            case "Add Employee":
                addEmp();
                break;
            case "Remove Employee":
                removeEmp();
                break;
            case "View Roles":
                getRoles();
                break;
            case "Add Role":
            case "Remove Role":
            case "View Departments":
                getDepartments();
                break;
            case "Add Departement":
            case "Remove Department":
        }
    })
}

companyDB();