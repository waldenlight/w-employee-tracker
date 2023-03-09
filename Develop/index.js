const mysql = require("mysql2");
const inquirer = require('inquirer');
const cTable = require('console.table');

const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "FireFocusSitez100!",
        database: "employees_db",
    }
);

const viewEmployees = function () {
    const sql = `SELECT e.id, e.first_name, e.last_name,
    e.manager_id, role.title, department.department_name, role.salary, m.first_name AS manager_name
    FROM employee e
    LEFT JOIN employee m ON e.manager_id=m.id
    INNER JOIN role ON role.id=e.role_id
    INNER JOIN department ON department.id=role.department_id`;

    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err)
            return;
        }
        console.table(rows);
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
            }
        ])
        .then((response) => {
            // const countSQL = `SELECT id FROM employee`;

            // let employeeCount = 0;

            // db.query(countSQL, (err, rows) => {
            //     if (err) {
            //         console.log(err);
            //         return;
            //     }
            //     for (let i = 0; i < rows.length; i++) {
            //         employeeCount += 1;
            //     }
            //     console.log(employeeCount);
            // })

            // console.log(employeeCount);
            // const newId = employeeCount + 1;

            const sql = `INSERT INTO employee(id, first_name, last_name, manager_id, role_id)\n
                VALUES(09, '${response.firstName}', '${response.lastName}', 0${response.manager}, 0${response.role})`

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
        console.table(rows);
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
            const sql = `INSERT INTO role(id, title, salary, department_id)\n
            VALUES(09, '${response.title}', '${response.salary}', ${response.department})`

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
        console.table(rows);
        initialPrompts();
    });
}

const addDepartment = function () {
    inquirer
        .prompt([
            {
                type: 'input',
                message: "What is the name of the department?",
                name: 'name',
            }
        ])
        .then((response) => {
            const sql = `INSERT INTO department(id, department_name) VALUES(09, '${response.name}')`

            db.query(sql, (err, rows) => {
                if (err) {
                    console.log(err)
                    return;
                }
                console.log(`Added ${response.name} to the database`)
                initialPrompts();
            });
        })
}

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
                return;
            }
        });
}

initialPrompts();
