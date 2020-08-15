const Manager = require("./Develop/lib/Manager");
const Engineer = require("./Develop/lib/Engineer");
const Intern = require("./Develop/lib/Intern");

const render = require("./Develop/lib/htmlRenderer");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const { type } = require("os");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const Employee = require("./Develop/lib/Employee");

// Write code to use inquirer to gather information about the development team members, and to create objects for each team member (using the correct classes as blueprints!)

// HINT: each employee type (manager, engineer, or intern) has slightly different information; write your code to ask different questions via inquirer depending on employee type.

const teamMembers = [];

const manager = [{
        type: 'input',
        name: 'team',
        message: 'Welcome! Please enter a name for this team or project?'
    },
    {
        type: 'input',
        name: 'name',
        message: 'What is the name of the team/project manager?'
    },
    {
        type: 'input',
        name: 'managerId',
        message: `What is the manager's ID?`
    },
    {
        type: 'input',
        name: 'managerEmail',
        message: `What is the manager's E-mail?`
    },
    {
        type: 'input',
        name: 'managerOffice',
        message: `Lastly, what is the manager's Pahone number?`
    },
]

function employees() {
    inquirer.prompt([{
            type: 'rawlist',
            name: 'roles',
            message: `Select the role of the employee`,
            choices: ['Engineer', 'Intern']
        },
        {
            type: 'input',
            name: 'employeeName',
            message: 'What is the employees name?'
        },
        {
            type: 'input',
            name: 'employeeId',
            message: 'What is the employees ID?'
        },
        {
            type: 'input',
            name: 'employeeEmail',
            message: 'What is the employees E-mail?'
        }
    ]).then((roles) => {

        console.log(roles)

        if (roles.roles === 'Intern') {
            inquirer.prompt([{
                type: 'input',
                name: 'school',
                message: 'Please enter the Interns school name'
            }, ]).then((newIntern) => {
                console.log(newIntern)
                const intern = new Intern(roles.employeeName, roles.employeeId, roles.employeeEmail, newIntern.school);
                teamMembers.push(intern);
                reprompt()
            })
        } else if (roles.roles === 'Engineer') {
            inquirer.prompt([{
                type: 'input',
                name: 'github',
                message: 'Please the Engineers github'
            }, ]).then((newEngineer) => {
                console.log(newEngineer)
                const engineer = new Engineer(roles.employeeName, roles.employeeId, roles.employeeEmail, newEngineer.github)
                teamMembers.push(engineer);
                reprompt()
            })
        }

    })
}

// After the user has input all employees desired, call the `render` function (required above) and pass in an array containing all employee objects; the `render` function will generate and return a block of HTML including templated divs for each employee!
// After you have your html, you're now ready to create an HTML file using the HTML returned from the `render` function. Now write it to a file named `team.html` in the `output` folder. You can use the variable `outputPath` above target this location.

function reprompt() {
    inquirer.prompt([{
        type: 'rawlist',
        name: 'add',
        message: 'Would you like to add another employee?',
        choices: ['yes', 'no']
    }]).then((memberAdd) => {
        if (memberAdd.add === 'yes') {
            employees()
        } else {
            console.log('Got all Info Input!')
            console.log(teamMembers)
            let renderTeam = render(teamMembers)
            fs.writeFile(outputPath, renderTeam, (err) => {
                if (err) throw error
            })
        }

    })

}

inquirer.prompt(manager).then((answers) => {
    console.log(answers)
    let boss = new Manager(answers.name, answers.managerId, answers.managerEmail, answers.managerOffice)
    teamMembers.push(boss)
    employees()

})

// Hint: you may need to check if the `output` folder exists and create it if it does not.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer, and Intern classes should all extend from a class named Employee; see the directions for further information. Be sure to test out each class and verify it generates an object with the correct structure and methods. This structure will be crucial in order for the provided `render` function to work! ```