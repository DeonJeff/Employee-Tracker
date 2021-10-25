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

         // View employees
         function viewEmployee() {
            
            const Query = "SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, CONCAT(manager.first_name,"" , manager.last_name) AS manager, department.name FROM employee  LEFT JOIN role ON employee.role_id = role.id  LEFT JOIN department ON role.department_id = department.id  LEFT JOIN employee manager ON  employee.manager_id = manager.id"
          
            connection.query(Query, (err, data) => {
                if (err) throw err;
                console.table(data);
                init();
              })
            };
    
            function displayDepartments() {
                const depQuery = `SELECT * FROM department`
                connection.query(depQuery, (err, data) => {
                  if (err) throw err;
                  console.table(data);
                  init();
                })
              };
              
              function displayRoles() {
                const roleQuery = `SELECT * FROM role`
                connection.query(roleQuery, (err, data) => {
                  if (err) throw err;
                  console.table(data);
                  init();
                })
              };

              //display by department
              function displayEmpbyDepartment() {
                const depQuery1 = ("SELECT * FROM department");
              
                connection.query(depQuery1, (err, res,) => {
                  if (err) throw err;
                  const departments = response.map(element => {
                    return { name: `${element.name}` }
                  });
              
                  inquirer.prompt([{
                    type: "list",
                    name: "dept",
                    message: "Please select a department to view employees",
                    choices: "departments"
              
                  }]).then(answer => {
                    const depQuery2 = `SELECT employee.first_name, employee.last_name, employee.role_id AS role, CONCAT(manager.first_name,' ',manager.last_name) AS manager, department.name as department 
                    FROM employee LEFT JOIN role on employee.role_id = role.id 
                    LEFT JOIN department ON role.department_id =department.id LEFT JOIN employee manager ON employee.manager_id=manager.id
                    WHERE ?`
                    connection.query(depQuery2, [{ name: answer.dept }], function (err, res) {
                      if (err) throw err;
                      console.table(res)
                      init();
                    })
                  })
                })
              };

              // display employee by manager
              function displayEmbyManager() {
                let query1 = "SELECT * FROM employee e WHERE e.manager_id IS NULL"
              
                connection.query(query1, function (err, res) {
                  if (err) throw err;
                  const managers = res.map(function (element) {
                    return {
                      name: "${element.first_name} ${element.last_name}",
                      value: element.id
                    }
                  });
                  inquirer.prompt([{
                    type: "list",
                    name: "emByManager",
                    message: "Please select manager to view employees",
                    choices: managers
                  }])
                    .then(response => {
                      console.log(response.emByManager)
                      let query2 = `SELECT employee.id, employee.first_name, employee.last_name, employee.role_id AS role, CONCAT(manager.first_name, ' ', manager.last_name) as manager, department.name AS department FROM employee
                      LEFT JOIN role on employee.role_id = role.id
                      LEFT JOIN department on department.id = role.department_id
                      LEFT JOIN employee manager on employee.manager_id = manager.id
                      WHERE employee.manager_id = ?`
                      connection.query(query2, [response.emByManager], (err, data) => {
                        if (err) throw err;
                        console.table(data);
                        init()
                      })
                    })
                })
              };
          }