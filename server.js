const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');
const { showDepartments, showRoles, showEmployeesInfo, updateManager, updateRole, showEmployeesbyManager, showEmployeesbyDepartment, deleteRow, showDepartmentBudget, addDepartment, addRole, addEmployee } = require('./updates');
const { ModalActions } = require('semantic-ui-react');
var employed = [];
var role = [];
const depart = [];
const util = require('util');
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

const getEmployeesInfo = () => db.promise().query(showEmployeesInfo);

const viewEmployeesInfo = () => db.query(showEmployeesInfo, (err, data) => {
    if (err) {
        throw err
    } else {
        console.table(data);
        companyDB();
    }
});

const getDepartments = () => db.query(showDepartments, (err, data) => {
    if (err) {
        throw err
    } else {
        console.table(data)
        companyDB();
    }
}
);
const getDepartmentInfo = () => db.promise().query(showDepartments);

const getRoles = () => db.query(showRoles, (err, data) => {
    if (err) {
        throw err
    } else {
        console.table(data)
        companyDB();
    }
}
);

const getRoleInfo = () => db.promise().query(showRoles);

const changeManager = async () => {
    getEmployeesInfo().then((data) => {
        for (i = 0; i < data[0].length; i++) {
            employed.push(data[0][i].first_name.concat(' ', data[0][i].last_name, ' ', data[0][i].id))
        }
        return employed
    }).then((newData) =>
        inquirer.prompt([
            {
                type: 'list',
                message: 'Which Employee Would you like to update',
                name: 'employee',
                choices: newData
            }, {
                type: 'list',
                message: 'Who do you want to make their manager',
                name: 'manager',
                choices: newData
            }
        ])).then((res) => {
            const selectedId = parseInt(res.employee.split(' ')[2]);
            const selectedManger = parseInt(res.employee.split(' ')[2]);
            db.query(updateManager(selectedManger, selectedId), (err, data) => {
                if (err) {
                    throw err
                } else {
                    console.log("Manager updated");
                    companyDB();
                }
            });
        })
};


const changeRole = async () => {
    let selectedId;
    getEmployeesInfo().then((data) => {
        for (i = 0; i < data[0].length; i++) {
            employed.push(data[0][i].first_name.concat(' ', data[0][i].last_name, ' ', data[0][i].id))
        }
        return employed
    }).then((newData) =>
        inquirer.prompt([
            {
                type: 'list',
                message: 'Which Employee Would you like to update',
                name: 'employee',
                choices: newData
            }
        ])).then((res) => {
            selectedId = parseInt(res.employee.split(' ')[2]);
        }).then(getRoleInfo).then((data) => {
            console.log(data[0])
            for (i = 0; i < data[0].length; i++) {
                role.push(data[0][i].title.concat(' ', data[0][i].id))
            }
            return role
        }).then((newData) => inquirer.prompt([
            {
                type: 'list',
                message: 'Which Employee Would you like to update',
                name: 'role',
                choices: newData
            }
        ])).then((res) => {
            const number = res.role.split(' ').findIndex(findNum)
            const selectedRole = parseInt(res.role.split(' ')[number]);
            db.query(updateRole(selectedRole, selectedId), (err, data) => {
                if (err) {
                    throw err
                } else {
                    console.log("Role updated");
                    companyDB();
                }
            });
        })
};


const addEmp = async () => {
    getEmployeesInfo().then((data) => {
        for (i = 0; i < data[0].length; i++) {
            employed.push(data[0][i].first_name.concat(' ', data[0][i].last_name, ' ', data[0][i].id))
        }
        employed.push('No manager assigned')
        return employed
    })
    getRoleInfo().then((data) => {
        for (i = 0; i < data[0].length; i++) {
            role.push(data[0][i].title.concat(' ', data[0][i].id))
        }
        return role
    })
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is their name?',
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
            message: 'Who is their manager',
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

};

const addRoles = async () => {
    getDepartmentInfo().then((data) => {
        for (i = 0; i < data[0].length; i++) {
            depart.push(data[0][i].name.concat(' ', data[0][i].id))
        }
        return depart
    })
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the title for this role?',
            name: 'title'
        },
        {
            type: 'number',
            message: 'What is the salary for this role',
            name: 'salary'

        },
        {
            type: 'list',
            message: 'What department do they belong too?',
            name: 'departs',
            choices: depart
        }
    ]).then((res) => {
        const number = res.departs.split(' ').findIndex(findNum)
        const selectedDepartment = parseInt(res.departs.split(' ')[number]);
        db.query(addRole(res.title, res.salary, selectedDepartment), (err, data) => {
            if (err) {
                throw err
            } else {
                console.log('Role added.')
                companyDB();
            }
        }
        )
    })
};


const getEmployeesbyManager = () => db.query(showEmployeesbyManager, (err, data) => {
    if (err) {
        throw err
    } else {
        console.table(data)
        companyDB();
    }
}
);

const getEmployeesbyDepartement = () => db.query(showEmployeesbyDepartment, (err, data) => {
    if (err) {
        throw err
    } else {
        console.table(data)
        companyDB();
    }
}
);

const removeEmp = async () => {
    getEmployeesInfo().then((data) => {
        for (i = 0; i < data[0].length; i++) {
            employed.push(data[0][i].first_name.concat(' ', data[0][i].last_name, ' ', data[0][i].id))
        }
        return employed
    }).then((data) => 
    inquirer.prompt([
        {
            type: 'list',
            message: 'Who would you like to remove',
            name: 'removed',
            choices: data
        }
    ])).then((res) => {
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

const removeRole = async () => {
    getRoleInfo().then((data) => {
        for (i = 0; i < data[0].length; i++) {
            role.push(data[0][i].title.concat(' ', data[0][i].id))
        }
        return role
    }).then((data) => 
    inquirer.prompt([
        {
            type: 'list',
            message: 'Which role would you like to remove',
            name: 'removed',
            choices: data
        }
    ])).then((res) => {
        const number = res.removed.split(' ').findIndex(findNum)
        const selectedRole = parseInt(res.removed.split(' ')[number]);
        db.query(deleteRow('roles', selectedRole), (err, data) => {
            if (err) {
                throw err
            } else {
                console.log('Role Removed')
                companyDB();
            }
        })
    })
}

const removeDepartment = async () => {
    getDepartmentInfo().then((data) => {
        for (i = 0; i < data[0].length; i++) {
            depart.push(data[0][i].name.concat(' ', data[0][i].id))
        }
        return depart
    }).then((data) => 
    inquirer.prompt([
        {
            type: 'list',
            message: 'Which Department would you like to remove?',
            name: 'removed',
            choices: data
        }
    ])).then((res) => {
        const number = res.removed.split(' ').findIndex(findNum)
        const selectedDepartment = parseInt(res.removed.split(' ')[number]);
        db.query(deleteRow('department', selectedDepartment), (err, data) => {
            if (err) {
                throw err
            } else {
                console.log('Department Removed')
                companyDB();
            }
        })
    })
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
                viewEmployeesInfo()
                break;
            case "View Employee by Manager":
                getEmployeesbyManager();
                break;
            case "View Employee by Department":
                getEmployeesbyDepartement();
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
                addRoles();
                break;
            case "Remove Role":
                removeRole();
                break;
            case "View Departments":
                getDepartments();
                break;
            case "Add Departement":
            case "Remove Department":
                removeDepartment();
                break;
        }
    })
}

companyDB();