// Include packages needed for this application
const inquirer = require('inquirer')
const fs = require('fs')
const Engineer = require('./lib/Engineer')
const Manager = require('./lib/Manager')
const Intern = require('./lib/Intern')
const generatePage = require('./src/page-template')
const { writeFile } = require('./src/generate-site.js');

const managerQuestions = [
    {
        type: 'input',
        name: 'name',
        message: 'What is the team manager\'s name?',
        validate: nameInput => {
            if (nameInput) {
                return true
            } else {
                console.log('Manager name is required!')
                return false
            }
        }
    },
    {
        type: 'input',
        name: 'officeNum',
        message: 'What is the manager\'s office number?',
        validate: nameInput => {
            if (nameInput) {
                return true
            } else {
                console.log('Office number is required!')
                return false
            }
        }
    }
]

const commonQuestions = [
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
    }
]

const confirmQuestion = [
    {
        type: 'confirm',
        name: 'confirmAddMoreEmployees',
        message: 'Would you like to add another employee?',
        default: false
    }
]

const nonManagerQuestions = [
    {
        type: 'list',
        name: 'role',
        message: 'Add an employee to the team. What is the employee\'s role?',
        choices: ['Engineer', 'Intern']
    },
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
    }
]

const promptEmployee = () => {
    //If there's no 'employees' array, create one and ask for the manager
    if (typeof employees === 'undefined') {
        employees = [];
        return inquirer.prompt([...managerQuestions, ...commonQuestions])
        .then(employeeData => {
            employees.push(new Manager(employeeData.name, employeeData.id, employeeData.email, employeeData.officeNum))
            return promptEmployee()
        })
    }
    // if the employees array already exists, don't ask for the manager
    return inquirer.prompt([...nonManagerQuestions, ...commonQuestions, ...confirmQuestion])
        .then(employeeData => {
            // add the employee data to the employees objects array
            if (employeeData.role == 'Engineer') {
                employees.push(new Engineer(employeeData.name, employeeData.id, employeeData.email, employeeData.github))
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