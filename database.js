var mysql = require('mysql');
var URL = require('url');


var db_url = URL.parse(process.env.DATABASE_URL);
var auth = db_url.auth.split(':');

var connection = mysql.createPool({
  host            : db_url.host,
  user            : auth[0],
  password        : auth[1],
  database        : db_url.path.substr(1)
});



module.exports = connection;
