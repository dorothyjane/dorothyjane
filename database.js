var mysql = require('mysql');

var connection = mysql.createConnection({
  host :     process.env.DATABASE_URL,
});

module.exports = connection;
