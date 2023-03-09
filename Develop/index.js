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
    e.manager_id, role.title, department.department_name AS department, role.salary, m.last_name AS manager
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
    const sql = `SELECT employee.last_name AS name, employee.id AS value FROM employee`;

    db.query(sql, (err, managers) => {
        if (err) {
            console.log(err)
            return;
        }
        const sql = `SELECT role.title AS name, role.id AS value FROM role`;

        db.query(sql, (err, roles) => {
            if (err) {
                console.log(err)
                return;
            }

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
                        choices: roles,
                    },
                    {
                        type: 'list',
                        message: "Who is the employee's manager?",
                        name: 'manager',
                        choices: managers,
                    }
                ])
                .then((response) => {
                    const sql = `INSERT INTO employee(first_name, last_name, manager_id, role_id)\n
                VALUES('${response.firstName}', '${response.lastName}', 0${response.manager}, 0${response.role})`

                    db.query(sql, (err, rows) => {
                        if (err) {
                            console.log(err)
                            return;
                        }
                        console.log(`Added ${response.firstName} ${response.lastName} to the database`)
                        initialPrompts();
                    });
                })
        });
    });
}

const updateEmployeeRole = function () {

    const sql = `SELECT employee.last_name AS value FROM employee`;

    db.query(sql, (err, employees) => {
        if (err) {
            console.log(err)
            return;
        }

        const sql = `SELECT title AS name, id AS value FROM role`;

        db.query(sql, (err, roles) => {
            if (err) {
                console.log(err)
                return;
            }

            inquirer
                .prompt([
                    {
                        type: 'list',
                        message: "Which employee's role do you want to update?",
                        name: 'employee',
                        choices: employees,
                    },
                    {
                        type: 'list',
                        message: "Which role do you want to assign to the selected employee?",
                        name: 'role',
                        choices: roles
                    }
                ])
                .then((response) => {
                    const sql = `UPDATE employee SET role_id = '${response.role}' WHERE last_name = '${response.employee}'`

                    db.query(sql, (err, rows) => {
                        if (err) {
                            console.log(err)
                            return;
                        }
                        console.log(`Updated employee's role`)
                        initialPrompts();
                    });
                })
        });
    });
}

const viewAllRoles = function () {
    const sql = `SELECT role.id, title, department_name AS department, salary 
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
    const sql = `SELECT department.department_name AS name, department.id AS value FROM department`;

    db.query(sql, (err, departments) => {
        if (err) {
            console.log(err)
            return;
        }

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
                    choices: departments,
                }
            ])
            .then((response) => {
                const sql = `INSERT INTO role(title, salary, department_id)\n
            VALUES('${response.title}', '${response.salary}', ${response.department})`

                db.query(sql, (err, rows) => {
                    if (err) {
                        console.log(err)
                        return;
                    }
                    console.log(`Added ${response.title} to the database`)
                    initialPrompts();
                });
            })
    });
}

const viewAllDepartments = function () {
    const sql = `SELECT department.id, department_name AS department
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
            const sql = `INSERT INTO department(department_name) VALUES('${response.name}')`

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
                updateEmployeeRole();
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
