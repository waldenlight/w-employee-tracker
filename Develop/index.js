const inquirer = require('inquirer');

const viewEmployees = function () { }

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
            if (response.value === 0) {
                viewEmployees();
            } else if (response.value === 1) {
                addEmployee();
            } else if (response.value === 2) {
                updateEmployeeRole();
            } else if (response.value === 3) {
                viewAllRoles();
            } else if (response.value === 4) {
                addRole();
            } else if (response.value === 5) {
                viewAllDepartments();
            } else if (response.value === 6) {
                addDepartment();
            } else if (response.value === 7) {
                quit();
            }
        });
}

initialPrompts();