const mysql = require('mysql2');
const db = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "123456",
    database:"iteacher_db" 
})

module.exports = db;
