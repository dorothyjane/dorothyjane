var mysql = require('mysql');

var connection = mysql.createConnection(process.env.DATABASE_URL);

module.exports = connection;
