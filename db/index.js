const connection =  require("./connection");
class DB {
    constructor() {
        this.connection = connection
    }
    findAllRoles() {
        return this.connection.promise().query( 
           "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;" 
        )
    }
}

module.exports = new DB(connection);