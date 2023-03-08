const mysql = require("mysql2");
const inquirer = require('inquirer');
const cTable = require('console.table');

// Do the connect stuff here, no fetch, no server
const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "FireFocusSitez100!",
        database: "employees_db",
    }
);

const viewEmployees = function () {
    const sql = `SELECT employee.id, first_name, last_name, manager_id, title, department_name, salary, manager_id
    FROM employee
    INNER JOIN role ON role.id=employee.role_id
    INNER JOIN department ON department.id=role.department_id`;

    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err)
            return;
        }
        console.table([
            {
                id: rows[6].id,
                first_name: rows[6].first_name,
                last_name: rows[6].last_name,
                title: rows[6].title,
                department: rows[6].department_name,
                salary: rows[6].salary,
                manager: rows[6].manager_id,
            },
            {
                id: rows[7].id,
                first_name: rows[7].first_name,
                last_name: rows[7].last_name,
                title: rows[7].title,
                department: rows[7].department_name,
                salary: rows[7].salary,
                manager: rows[7].manager_id,
            },
            {
                id: rows[0].id,
                first_name: rows[0].first_name,
                last_name: rows[0].last_name,
                title: rows[0].title,
                department: rows[0].department_name,
                salary: rows[0].salary,
                manager: rows[0].manager_id,
            },
            {
                id: rows[1].id,
                first_name: rows[1].first_name,
                last_name: rows[1].last_name,
                title: rows[1].title,
                department: rows[1].department_name,
                salary: rows[1].salary,
                manager: rows[1].manager_id,
            },
            {
                id: rows[4].id,
                first_name: rows[4].first_name,
                last_name: rows[4].last_name,
                title: rows[4].title,
                department: rows[4].department_name,
                salary: rows[4].salary,
                manager: rows[4].manager_id,
            },
            {
                id: rows[5].id,
                first_name: rows[5].first_name,
                last_name: rows[5].last_name,
                title: rows[5].title,
                department: rows[5].department_name,
                salary: rows[5].salary,
                manager: rows[5].manager_id,
            },
            {
                id: rows[2].id,
                first_name: rows[2].first_name,
                last_name: rows[2].last_name,
                title: rows[2].title,
                department: rows[2].department_name,
                salary: rows[2].salary,
                manager: rows[2].manager_id,
            },
            {
                id: rows[3].id,
                first_name: rows[3].first_name,
                last_name: rows[3].last_name,
                title: rows[3].title,
                department: rows[3].department_name,
                salary: rows[3].salary,
                manager: rows[3].manager_id,
            }
        ]);
        initialPrompts();
    });
}

const addEmployee = function () {
    inquirer
        .prompt([
            {
                type: 'input',
                message: "What is the employee's first name?",
                name: 'firstName',
            },
            {
                type: 'input',
                message: "What is the employee's last name?",
                name: 'lastName',
            },
            {
                type: 'list',
                message: "What is the emloyee's role?",
                name: 'role',
                choices: [
                    {
                        name: 'Sales Lead',
                        value: 01,
                    },
                    {
                        name: 'Salesperson',
                        value: 02,
                    },
                    {
                        name: 'Lead Engineer',
                        value: 03,
                    },
                    {
                        name: 'Software Engineer',
                        value: 04,
                    },
                    {
                        name: 'Account Manager',
                        value: 05,
                    },
                    {
                        name: 'Accountant',
                        value: 06,
                    },
                    {
                        name: 'Legal Team Lead',
                        value: 07,
                    },
                    {
                        name: 'Lawyer',
                        value: 08,
                    },
                ],
            },
            {
                type: 'list',
                message: "Who is the employee's manager?",
                name: 'manager',
                choices: [
                    {
                        name: 'John Doe',
                        value: 01,
                    },
                    {
                        name: 'Mike Chan',
                        value: 02,
                    },
                    {
                        name: 'Ashley Rodriguez',
                        value: 03,
                    },
                    {
                        name: 'Kevin Tupik',
                        value: 04,
                    },
                    {
                        name: 'Kunal Singh',
                        value: 05,
                    },
                    {
                        name: 'Malia Brown',
                        value: 06,
                    },
                    {
                        name: 'Sarah Lourd',
                        value: 07,
                    },
                    {
                        name: 'Tom Allen',
                        value: 08,
                    },
                    {
                        value: 'Null',
                    },
                ],
            }
        ])
        .then((response) => {
            const sql = `INSERT INTO employee(id, first_name, last_name, manager_id, role_id)\n
            VALUES(8, ${response.firstName}, ${response.lastName}, ${response.manager}, ${response.role})`

            db.query(sql, (err, rows) => {
                if (err) {
                    console.log(err)
                    return;
                }
                console.log(`Added ${response.firstName} ${response.lastName} to the database`)
                initialPrompts();
            });
        })
}

const retrieveDbData = function (method) {
    const sql = `SELECT employee.id, first_name, last_name, manager_id, title, department_name, salary, manager_id
    FROM employee
    INNER JOIN role ON role.id=employee.role_id
    INNER JOIN department ON department.id=role.department_id`;

    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        if (method === "Update") {
            updateEmployeeRole(rows);
        }
    })
}

const findTitleId = function (title) {
    const sql = `SELECT title, id FROM role`;

    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        for (let i = 0; i < rows.length; i++) {
            const currentRole = rows[i];
            if (currentRole.title === title) {
                const roleId = currentRole.id
                return roleId;
            }
        }
    })
}

const updateEmployeeRole = function (data) {

    const employeeOne = data[6];
    const employeeTwo = data[7];
    const employeeThree = data[0];
    const employeeFour = data[1];
    const employeeFive = data[4];
    const employeeSix = data[5];
    const employeeSeven = data[2];
    const employeeEight = data[3];

    inquirer
        .prompt([
            {
                type: 'list',
                message: "Which employee's role do you want to update?",
                name: 'employee',
                choices: [
                    {
                        value: `${employeeOne.last_name}`,
                    },
                    {
                        value: `${employeeTwo.last_name}`,
                    },
                    {
                        value: `${employeeThree.last_name}`,
                    },
                    {
                        value: `${employeeFour.last_name}`,
                    },
                    {
                        value: `${employeeFive.last_name}`,
                    },
                    {
                        value: `${employeeSix.last_name}`,
                    },
                    {
                        value: `${employeeSeven.last_name}`,
                    },
                    {
                        value: `${employeeEight.last_name}`,
                    },
                ],
            },
            {
                type: 'list',
                message: "Which role do you want to assign to the selected employee?",
                name: 'role',
                choices: [
                    {
                        name: 'Sales Lead',
                        value: 01,
                    },
                    {
                        name: 'Salesperson',
                        value: 02,
                    },
                    {
                        name: 'Lead Engineer',
                        value: 03,
                    },
                    {
                        name: 'Software Engineer',
                        value: 04,
                    },
                    {
                        name: 'Account Manager',
                        value: 05,
                    },
                    {
                        name: 'Accountant',
                        value: 06,
                    },
                    {
                        name: 'Legal Team Lead',
                        value: 07,
                    },
                    {
                        name: 'Lawyer',
                        value: 08,
                    },
                ]
            }
        ])
        .then((response) => {
            const sql = `UPDATE employee
            SET role_id = '${response.role}'
            WHERE last_name = '${response.employee}'`

            db.query(sql, (err, rows) => {
                if (err) {
                    console.log(err)
                    return;
                }
                console.log(`Updated employee's role`)
                initialPrompts();
            });
        })
}

const viewAllRoles = function () {
    const sql = `SELECT role.id, title, department_name, salary 
    FROM role
    INNER JOIN department ON department.id=role.department_id`;

    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err)
            return;
        }
        console.log(rows);
        console.table([
            {
                id: rows[6].id,
                title: rows[6].title,
                department: rows[6].department_name,
                salary: rows[6].salary
            },
            {
                id: rows[7].id,
                title: rows[7].title,
                department: rows[7].department_name,
                salary: rows[7].salary
            },
            {
                id: rows[0].id,
                title: rows[0].title,
                department: rows[0].department_name,
                salary: rows[0].salary
            },
            {
                id: rows[1].id,
                title: rows[1].title,
                department: rows[1].department_name,
                salary: rows[1].salary
            },
            {
                id: rows[4].id,
                title: rows[4].title,
                department: rows[4].department_name,
                salary: rows[4].salary
            },
            {
                id: rows[5].id,
                title: rows[5].title,
                department: rows[5].department_name,
                salary: rows[5].salary
            },
            {
                id: rows[2].id,
                title: rows[2].title,
                department: rows[2].department_name,
                salary: rows[2].salary
            },
            {
                id: rows[3].id,
                title: rows[3].title,
                department: rows[3].department_name,
                salary: rows[3].salary
            }
        ]);
        initialPrompts();
    });
}

const addRole = function () {
    inquirer
        .prompt([
            {
                type: 'input',
                message: "What is the name of the role?",
                name: 'title',
            },
            {
                type: 'input',
                message: "What is the salary of the role?",
                name: 'salary',
            },
            {
                type: 'list',
                message: "Which department does the role belong to?",
                name: 'department',
                choices: [
                    {
                        name: 'Engineering',
                        value: 01,
                    },
                    {
                        name: 'Legal',
                        value: 02,
                    },
                    {
                        name: 'Finance',
                        value: 03,
                    },
                    {
                        name: 'Sales',
                        value: 04,
                    },
                ],
            }
        ])
        .then((response) => {
            const sql = `INSERT INTO role(id, title, salary, department_id) VALUES(${08}, ${response.title}, ${response.salary}, ${response.department})`

            db.query(sql, (err, rows) => {
                if (err) {
                    console.log(err)
                    return;
                }
                console.log(`Added ${response.title} to the database`)
                initialPrompts();
            });
        })
}

const viewAllDepartments = function () {
    const sql = `SELECT department.id, department_name 
    FROM department`;

    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err)
            return;
        }
        console.table([
            {
                id: rows[0].id,
                department: rows[0].department_name,
            },
            {
                id: rows[1].id,
                department: rows[1].department_name,
            },
            {
                id: rows[2].id,
                department: rows[2].department_name,
            },
            {
                id: rows[3].id,
                department: rows[3].department_name,
            },
        ]);
        initialPrompts();
    });
}

const addDepartment = function () { }

const quit = function () { }

const initialPrompts = function () {
    inquirer.registerPrompt('list-input', require('inquirer-list-input'));
    inquirer
        .prompt([
            {
                type: 'list',
                message: "What would you like to do?",
                name: 'initial',
                choices: [
                    {
                        name: 'View All Employees',
                        value: 0,
                    },
                    {
                        name: 'Add Employee',
                        value: 1,
                    },
                    {
                        name: 'Update Employee Role',
                        value: 2,
                    },
                    {
                        name: 'View All Roles',
                        value: 3,
                    },
                    {
                        name: 'Add Role',
                        value: 4,
                    },
                    {
                        name: 'View All Departments',
                        value: 5,
                    },
                    {
                        name: 'Add Department',
                        value: 6,
                    },
                    {
                        name: 'Quit',
                        value: 7,
                    },
                ],
            }
        ])
        .then((response) => {
            if (response.initial === 0) {
                viewEmployees();
            } else if (response.initial === 1) {
                addEmployee();
            } else if (response.initial === 2) {
                retrieveDbData("Update");
            } else if (response.initial === 3) {
                viewAllRoles();
            } else if (response.initial === 4) {
                addRole();
            } else if (response.initial === 5) {
                viewAllDepartments();
            } else if (response.initial === 6) {
                addDepartment();
            } else if (response.initial === 7) {
                quit();
            }
        });
}

initialPrompts();
