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
            
            const Query = "SELECT employee.id  , employee.first_name, employee.last_name, role.title, department.name AS department, role.salary" 
              CONCAT(manager.first_name,"" , manager.last_name) AS manager, 
              FROM employee,  
              LEFT JOIN role ON employee.role_id = role.id, 
               LEFT JOIN department ON role.department_id = department.id, 
                LEFT JOIN employee manager ON  employee.manager_id = manager.id"
          
            connection.query(Query, (err, data) => {
                if (err) throw err;
                console.table(data);
                init();
              })
            };
    
               // view Departments
            function displayDepartments() {
                const depQuery = `SELECT * FROM department`

                connection.query(depQuery, (err, data) => {
                  if (err) throw err;
                  console.table(data);
                  init();
                })
              };
              
               // view roles
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
              
                connection.query(depQuery1, (err, response) => {
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
                    WHERE ?`;

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
                      WHERE employee.manager_id = ?`;

                      connection.query(query2, [response.emByManager], (err, data) => {
                        if (err) throw err;
                        console.table(data);
                        init()
                      })
                    })
                })
              };

              // new employee
              function addEmployee() {
                let addQuery = `SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, role.title, department.name,
                role.salary, employee.manager_id 
                  FROM employee
                  INNER JOIN role 
                  On role.id = employee.role_id
                  INNER JOIN department 
                  ON department.id = role.department_id`;

                connection.query(addQuery, (err, results) => {
                  if (err) throw err;
                  inquirer.prompt([
                    {
                      type: "input",
                      name: "first_name",
                      message: "Enter employee first name"
                    }, {
                      type: "input",
                      name: "last_name",
                      message: "Enter employee last name"
                    }, {
                      type: "list",
                      name: "role",
                      message: "Select employee title",
                      choices: results.map(role => {
                        return { name: role.title, value: role.role_id }
                      })
                    }, {
                      type: "input",
                      name: "manager",
                      message: "Enter employee manager id"
                    }])
                    .then(answer => {
                      console.log(answer);
                      connection.query(
                        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)",
                        [answer.first_name, answer.last_name, answer.role, answer.manager],
                        function (err) {
                          if (err) throw err
                          console.log(`${answer.first_name} ${answer.last_name} added as a new employee`)
                          init();
                        })
                    })
                })
              };

              // remove empolyee
              function removeEmployee() {
                let query1 = `SELECT * FROM employee`
                connection.query(query1, (err, res) => {
                  if (err) throw err;
                  inquirer.prompt([{
                    type: "list",
                    name: "emId",
                    message: "Pick employee to remove",
                    choices: res.map(employee => {
                      return { name: `${employee.first_name} ${employee.last_name}`, value: employee.id }
                    })
                  }])
                    .then(answer => {
                      let query2 = `DELETE FROM employee WHERE ?`
                      connection.query(query2, [{ id: answer.emId }], (err) => {
                        if (err) throw err;
                        console.log("Employee gone");
                        init();
                      })
                    })
                })
              };
              
              //update role
              function updateEmployeeRole() {
                let query = "SELECT * FROM employee";
              
                connection.query(query, (err, response) => {
              
                  const employees = response.map(function (element) {
                    return {
                      name: `${element.first_name} ${element.last_name}`,
                      value: element.id
                    }
                  });

                  inquirer.prompt([{
                    type: "list",
                    name: "employeeId",
                    message: "Which employees role do you want to update",
                    choices: employees
                  }])
                    .then(input1 => {
                      connection.query("SELECT * FROM role", (err, data) => {
              
                        const roles = data.map(function (role) {
                          return {
                            name: role.title,
                            value: role.id
                          }
                        });
              
                        inquirer.prompt([{
                          type: "list",
                          name: "roleId",
                          message: "What's the new role",
                          choices: roles
                        }])
                          .then(input2 => {
                            const query1 = `UPDATE employee
                      SET employee.role_id = ? 
                      WHERE employee.id = ?`
                            connection.query(query1, [input2.roleId, input1.employeeId], function (err, res) {
                              var tempPosition;
                              
                              for (var k = 0; k < roles.length; k++) {
                                if (roles[k].value == input2.roleId) {
                                  tempPosition = roles[k].name;
                                }
                              }
                              
                              var tempName;
                              for (var g = 0; g < employees.length; g++) {
                                if (employees[g].value == input1.employeeId) {
                                  tempName = employees[g].name;
                                }
                              }
              
                              if (res.changedRows === 1) {
                                console.log(`Successfull ${tempName} to position of ${tempPosition}`);
                              } else {
                                console.log(`Error: ${tempName}'s current position is ${tempPosition}`)
                              }
                              
                              init();
                            })
                          })
                      })
                    })
                })
              };
      
                //remove role
              function removeRole() {
                let query1 = `SELECT * FROM role`
                connection.query(query1, (err, res) => {
                  if (err) throw err;
                  inquirer.prompt([{
                    type: "list",
                    name: "roleId",
                    message: "Select role to remove",
                    choices: res.map(roles => {
                      return { name: `${roles.title}`, value: roles.id }
                    })
                  }])
                    .then(answer => {
                      let query2 = `DELETE FROM role WHERE ?`
                      connection.query(query2, [{ id: answer.roleId }], (err) => {
                        if (err) throw err;
                        console.log("Role gone");
                        init();
                      })
                    })
                })
              };

              // add department
              function addDepartment() {
                let query1 = `SELECT * FROM department`
                connection.query(query1, (err, res) => {
                  if (err) throw err
                  inquirer.prompt([{
                    type: "input",
                    name: "deptId",
                    message: "Enter id for new department"
                  }, {
                    type: "input",
                    name: "deptName",
                    message: "Enter name for new department"
                  }])
                    .then(answers => {
                      let query2 = `INSERT INTO department VALUES (?,?)`
                      connection.query(query2, [answers.deptId, answers.deptName], (err) => {
                        if (err) throw err
                        console.log(`${answers.deptName} added as a new department`)
                        init();
                      })
                    })
                })
              };

                   // remove Dept
              function removeDept() {
                let query1 = `SELECT * FROM department`
                connection.query(query1, (err, res) => {
                  if (err) throw err;
                  inquirer.prompt([{
                    type: "list",
                    name: "deptId",
                    message: "Select a department to remove",
                    choices: res.map(departments => {
                      return { name: `${departments.name}`, value: departments.id }
                    })
                  }])
                    .then(answer => {
                      let query2 = `DELETE FROM department WHERE ?`
                      connection.query(query2, [{ id: answer.deptId }], (err) => {
                        if (err) throw err;
                        console.log("Department removed")
                        init();
                      })
                    })
                })
              };

          