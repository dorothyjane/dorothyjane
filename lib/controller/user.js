var bcrypt = require('bcrypt-nodejs');
var session = require('express-session');
var connection = require('../../database'); // up one, ina folder...

exports.createUser = function(req, res){
  var params = req.body; // bodyparser put them here
  if(!params.name){
    return res.status(400).send("You must include a name");
  }
  if(!params.location){
    return res.status(400).send("You must include a location");
  }
  var person = {name : req.body.name, location: req.body.location }; //  double make sure they don't put crap in!!!
  connection.query("insert into persons set ?", person, function(err, result){
    if(err){
      return res.status(500).send("error setting person");
    }
    person.id = result.insertId;
    res.status(201).send(person);
  });
}

exports.getUsers = function(req, res){
  var location = req.query.location;
  var query;
  var params = [];
  if(location){ // empty string is falsey
    query = "select * from persons where location = ?";
    params.push(location);
  } else {
    query = "select * from persons"
  }
  connection.query(query, params, function(err, results){
    if(err){
      return res.status(500).send("SQL filter gone wrong"); // 500 is internal server error
    }
    res.send(results);
  });
}

exports.updateUser = function(req, res){

}

exports.getUser = function(req, res){
  connection.query("select * from persons where id = ?", [req.params.id], function(err, response){ // have to have function, is asynchronous
    if(err){
      return res.status(500).send("error finding person");
    }
    var person = response[0];
    if(!person){
      return res.status(404).send("couldn't find person!");
    }
    res.send(person);
  });
}

module.exports = exports;
