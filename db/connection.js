const mysql = require("mysq12");
const db = mysql.createConnection({
    host: "localhost",
    useer: "root",
    password: "password",
    database: "employees"
});
 
module.exports = db;