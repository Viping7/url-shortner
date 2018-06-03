const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'matta',
    database: 'shorturl'
});

module.exports = connection;