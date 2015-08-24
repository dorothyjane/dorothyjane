var mysql = require('mysql');

var connection = mysql.createPool(process.env.DATABASE_URL);

module.exports = connection;
