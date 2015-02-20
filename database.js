var mysql = require('mysql');
var connection = mysql.createConnection({
  host :     "localhost",
  user :     "dorothyjane",
  password : "foobar",
  database : "people"
});

module.exports = connection;
