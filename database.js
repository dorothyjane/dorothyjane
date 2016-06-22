var mysql = require('mysql');
var URL = require('url');


// var db_url = URL.parse(process.env.DATABASE_URL);
// var auth = db_url.auth.split(':');

// var connection = mysql.createPool({
//   host            : db_url.hostname,
//   user            : auth[0],
//   password        : auth[1],
//   database        : db_url.path.substr(1)
// });

var db_connection = process.env.DATABASE_URL || 'mysql://user:pass@host/db?waitForConnections=false';
var connection = mysql.createPool(db_connection);


module.exports = connection;
