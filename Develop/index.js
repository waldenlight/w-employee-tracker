const inquirer = require('inquirer');

const viewEmployees = async function () {
    const res = await fetch('/employees', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (response.ok) {
        const data = await res.json()
        console.log(data)
    }
}

const addEmployee = function () { }

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