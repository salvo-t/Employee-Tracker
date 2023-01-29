const inquirer = require('inquirer')
const mysql = require('mysql2')
require('console.table');
const { type } = require('os');
const { default: Choices } = require('inquirer/lib/objects/choices');
const { default: Choice } = require('inquirer/lib/objects/choice');
const { allowedNodeEnvironmentFlags, title } = require('process');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql1',
    database: 'work'
  });

db.connect((err) => {
    if(err) {
        console.log(err)
    }
})

const interface = () => {
    return inquirer
    .prompt([
        {
            type: 'list',
            name: 'mainMenu',
            message: 'What would you like to do?',
            choices: ['All employees', 'Add employee', 'Update employee role', 'All roles', 'Add roles', 'All departments', 'Add departments', 'Quit']
        }
    ]).then((response) => {
        switch(response.mainMenu) {
            case 'All employees':
                allEmployees()
                break;

            case 'Add employee':
                addEmpolyee()
                break;
            
            case 'Update employee role':
                updateEmployeeRole()
                break;

            case 'All roles':
                allRoles()
                break;
            
            case 'Add roles':
                addRoles()
                break;
            
            case 'All departments':
                allDepartments()
                break;

            case 'Add departments':
                addDepartments()
                break;
            
            case 'Quit':
                db.end()
        };   
    });
};

const allEmployees = () => {
    db.query(`
    SELECT first_name, last_name, role_id, title 
    FROM employees_table
    LEFT JOIN role_table
    ON employees_table.role_id = role_table.id`, (err, res) => {
        if (err) {
            console.log(err);
        }
        console.table(res);
        interface()
    })
};
const addEmpolyee = () => {
    inquirer.prompt([
    {
        type: 'input',
        name: 'firstName',
        message: 'Please type the employees first name'
    },
    {
        type: 'input',
        name: 'lastName',
        message: 'Please type the employees last name'
    },
    {
        type: 'input',
        name: 'roleId',
        message: 'Please type role id (number only)'
    },
    {
        type: 'list',
        name: 'managerId',
        message: 'Please choose manager type for employee, 1 is Engineering, 3 is Finance, 6 is Legal, 8 is Sales',
        choices: [1, 3, 6, 8]
    }]
).then (res => {
    console.log(res);
    db.query(`INSERT INTO employees_table SET ?`, {
        id: res.id,
        first_name: res.firstName,
        last_name: res.lastName,
        role_id: res.roleId,
        manager_id: res.managerId
    }, (err, res) => {
        if (err) {
            console.log(err);
        }
        console.log('Success! New employee added')
        console.table(res);
        interface()
    })
})
};

const updateEmployeeRole = () => {
    console.log("updateEmployeeRole")
    
    db.query(`
    SELECT first_name, last_name, role_id, title 
    FROM employees_table
    LEFT JOIN role_table
    ON employees_table.role_id = role_table.id`,
     (err, res) => {
        if (err) {
            console.log(err);
        }
        
        let employeeChoiceArray = [];
        
        res.forEach((employee) => {
            employeeChoiceArray.push(`${employee.first_name} ${employee.last_name}`)
        })
        inquirer.prompt([{
            type: 'list',
            name: 'employeeSelect',
            message: 'Choose the employee to update. Starting with role id 1',
            choices: employeeChoiceArray
        }]).then(res => {
            db.query(`SELECT title FROM role_table`, 
            (err, res) => {
                if (err) {
                    console.log(err)

                    let titleChoiceArray = [];
                    
                    employeeChoiceArray.forEach((title) => {
                    titleChoiceArray.push(`${title.title}`)
                })
                }
            })
            console.log(res)
        inquirer.prompt([
            {
                type: 'input',
                name: 'roleSelect',
                message: 'Type role id for employee',
            },
            {
            type: 'input',
            name: 'titleSelect',
            message: 'Type new role for employee'
        }]).then(res => {
            db.query(`UPDATE role_table SET ? WHERE id = ${res.roleSelect}`, {
                title: res.titleSelect, 
            },
            (err, res) => {
                if (err) {
                    console.log(err)
                }
                console.log('Success! New role added')
                console.table(res);
                interface()
            }
            )  
        })
        })
    })
}

const allRoles = () => {
    db.query(`SELECT title, salary FROM role_table`, (err, res) => {
        if (err) {
            console.log(err);
        }
        console.table(res);
        interface()
    })
};

const addRoles = () => {
    db.query("SELECT title FROM role_table", (err, res) => {
        if(err) {
            console.log(err)
        }
    })
    inquirer.prompt([{
        type: 'input',
        name: 'newTitle',
        message: 'Please enter in the new title for the employee',
    },
    {
        type: 'input',
        name: 'newSalary',
        message: 'Enter in the new salary for the employee',
    },
    {
        type: 'list',
        name: 'newDepartmentId',
        message: 'Please choose the department. Engineering is 1, Finance is 2, Legal is 3, Sales is 4',
        choices: [1, 2, 3, 4]
    }]).then(data => {
        db.query(`INSERT INTO role_table SET ?`, {
            title: data.newTitle,
            salary: data.newSalary,
            department_id: data.newDepartmentId
        },
         (err, res) => {
            if (err) {
                console.log(err)
            }
            console.log('Success! New role added')
            console.table(res);
            interface()
        })
    })

}

const allDepartments = () => {
    db.query(`SELECT dep_Name FROM department_table`, (err, res) => {
        if (err) {
            console.log(err);
        }
        console.table(res);
        interface();
    })
}

const addDepartments = () => {
    inquirer.prompt([{
        type: 'input',
        name: 'newDepartments',
        message: 'Enter in name of the new department'
    }]).then (res => { 
        db.query(`INSERT INTO department_table SET ?`,
            {
                dep_Name: res.newDepartments
            }, 
            (err, res) => { 
                if (err) {
                    console.log(err)
                }
                console.table(res);
                console.log('Success! New department added')
                interface()
            }) 
        })
    };

interface();