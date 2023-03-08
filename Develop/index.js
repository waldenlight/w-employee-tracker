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
                        value: 0,
                    },
                    {
                        name: 'Salesperson',
                        value: 1,
                    },
                    {
                        name: 'Lead Engineer',
                        value: 2,
                    },
                    {
                        name: 'Software Engineer',
                        value: 3,
                    },
                    {
                        name: 'Account Manager',
                        value: 4,
                    },
                    {
                        name: 'Accountant',
                        value: 5,
                    },
                    {
                        name: 'Legal Team Lead',
                        value: 6,
                    },
                    {
                        name: 'Lawyer',
                        value: 7,
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
                        value: 0,
                    },
                    {
                        name: 'Mike Chan',
                        value: 1,
                    },
                    {
                        name: 'Ashley Rodriguez',
                        value: 2,
                    },
                    {
                        name: 'Kevin Tupik',
                        value: 3,
                    },
                    {
                        name: 'Kunal Singh',
                        value: 4,
                    },
                    {
                        name: 'Malia Brown',
                        value: 5,
                    },
                    {
                        name: 'Sarah Lourd',
                        value: 6,
                    },
                    {
                        name: 'Tom Allen',
                        value: 7,
                    },
                    {
                        name: 'Null',
                        value: 8,
                    },
                ],
            }
        ])
        .then((response) => {
            const sql = `INSERT INTO employee(id, first_name, last_name, manager_id, role_id)\n
            VALUES(${8}, ${response.firstName}, ${response.lastName}, ${response.manager}, ${response.role})`

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

const updateEmployeeRole = function () { }

const viewAllRoles = function () { }

const addRole = function () { }

const viewAllDepartments = function () { }

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
                quit();
            }
        });
}

initialPrompts();
