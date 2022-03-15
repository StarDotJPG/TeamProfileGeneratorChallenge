// Include packages needed for this application
const inquirer = require('inquirer')
const fs = require('fs')
const Engineer = require('./lib/Engineer')
const Manager = require('./lib/Manager')
const Intern = require('./lib/Intern')
const generatePage = require('./src/page-template')
const { writeFile, copyFile } = require('./src/generate-site.js');

const promptEmployee = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the employee\'s name?',
            validate: nameInput => {
                if (nameInput) {
                    return true
                } else {
                    console.log('Employee name is required!')
                    return false
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the ID of the employee?',
            validate: nameInput => {
                if (nameInput) {
                    return true
                } else {
                    console.log('Employee ID is required!')
                    return false
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the email of the employee?',
            validate: nameInput => {
                if (nameInput) {
                    return true
                } else {
                    console.log('Employee email is required!')
                    return false
                }
            }
        },
        {
            type: 'list',
            name: 'role',
            message: 'What is the employee\'s role?',
            choices: ['Engineer', 'Intern', 'Manager']
        },
        {
            type: 'input',
            name: 'officeNum',
            message: 'What is the manager\'s office number?',
            when(answers) {
                return answers.role == 'Manager';
            }
        },
        {
            type: 'input',
            name: 'school',
            message: 'What is the intern\'s school?',
            when(answers) {
                return answers.role == 'Intern';
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'What is the engineer\'s github?',
            when(answers) {
                return answers.role == 'Engineer';
            }
        },
        {
            type: 'confirm',
            name: 'confirmAddMoreEmployees',
            message: 'Would you like to add another employee?',
            default: false
        }
    ]).then(employeeData => {
        // If there's no 'employees' array, create one
        if (typeof employees === 'undefined') {
            employees = [];
        }

        // add the employee data to the employees objects array
        if (employeeData.role == 'Engineer') {
            employees.push(new Engineer(employeeData.name, employeeData.id, employeeData.email, employeeData.github))
        }
        if (employeeData.role == 'Manager') {
            employees.push(new Manager(employeeData.name, employeeData.id, employeeData.email, employeeData.officeNum))
        }
        if (employeeData.role == 'Intern') {
            employees.push(new Intern(employeeData.name, employeeData.id, employeeData.email, employeeData.school))
        }

        // if we need to add more employees, go to the start of the function, otherwise return
        if (employeeData.confirmAddMoreEmployees) {
            return promptEmployee();
        } else {
            return employees
        }
    })
}

// Function to initialize app
function init() {
    promptEmployee()
        .then(employees => {
            //return console.log(employees)
            return generatePage(employees)
        })
        .then(pageHTML => {
            return writeFile(pageHTML)
        })
        .then(writeFileResponse => {
            console.log(writeFileResponse)
        })
}

// Function call to initialize app
init();