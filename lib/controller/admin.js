var bcrypt = require('bcrypt-nodejs');
var session = require('express-session');
var connection = require('../../database');


exports.createAdminUser = function(req, res, next){
  var params = req.body; // bodyparser put them here
  if(!params.name){
    return res.status(400).send("You must include a name");
  }
  if(!params.password){
    return res.status(400).send("You must include a password");
  }
  var admin = {name : req.body.name, password: bcrypt.hashSync(req.body.password), admin: 1 }; //  double make sure they don't put crap in!!!
  connection.query("insert into admin set ?", admin, function(err, result){
    if(err){
      return res.status(500).send("error setting details");
    }

    admin.id = result.insertId;
    req.createdUser = admin;
    next();
  });
}

exports.updateAdminUser = function(req, res){
  //TODO
}

exports.getAdminUserById = function(req, res){
  connection.query("select * from admin where id = ?", [req.params.id], function(err, response){ // have to have function, is asynchronous
    if(err){
      return res.status(500).send("error finding admin");
    }
    var admin = response[0];
    if(!admin){
      return res.status(404).send("couldn't find admin!");
    }
    res.send(admin);
  });
}

exports.deleteAdminUser = function(req, res){
  //TODO
}

module.exports = exports;
