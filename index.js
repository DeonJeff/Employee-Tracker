const inquirer = require("inquirer");
const db = require("./db");
init() 
function init() {
    loadPrompts()
}
function loadPrompts() {
    inquirer.prompt( {
      type: "list",
      name: "task",
      message: "Would you like to do?",
      choices:  [ "View Employees", "View Employees by Department", "Add Employee", "Remove Employees",  "Update Employee Role", "Add Role", "End"]

    })
        
    }