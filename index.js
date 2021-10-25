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

    .then(function (res) {
        switch (res.start) {
            case "View all Employees":
                displayEmployees();
                break;

                case "View all Departments":
                displayDepartments();
                break;

                case "View all Roles":
                displayRoles();
                break;

                case "View all Employees by Deparment":
                displayEmpbyDepartment();
                break;

                case "View all Employees by Manager":
                displayEmbyManager();
                break;

                case "Add Employee":
                addEmployee();
                break;

                case "Remove Employee":
                removeEmployee();
                break;

                case "Update Employee Role":
                updateEmployeeRole();
                break;

                case "Remove Role":
                 removeRole();
                break;

                case "Add New Department":
                    addDepartment();
                break;

                case "Remove Department":
                    removeDept();
                    break;

                case "Update Employee Manager":
                    updateemployeeManager();
                    break;
 }
    })
         };