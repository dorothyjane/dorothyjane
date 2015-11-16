var express = require('express');
var bcrypt = require('bcrypt-nodejs');
var router = new express.Router();
// var admin = require('../controller/admin');
var connection = require('../../database');

// views
function loginPage(req, res){
  res.render('admin/login');
}

// login/logout
function login(req, res){
  connection.query("select * from admin where login =  ?", [
    req.body.name
  ], function(err, rows, fields){
    if(err){
      return res.status(500).send("login or password is incorrect");
    }
    if(rows.length < 1){
      return res.status(404).send("login or password is incorrect");
    }
    bcrypt.compare(req.body.password, rows[0].password, function(err, match) {
      if(err || !match){
        return res.status(401).send("login or password is incorrect");
      }
      req.session = {
        admin: {
          login: rows[0].login,
          id: rows[0].id
        }
      };
      res.redirect('/admin/index');
    });
  });
}


function logout(req, res){
  if(req.session.admin) {
    req.session.admin = null;
    res.redirect('/admin/login');
  }
  res.redirect('/index');
}

router.route('/admin/login')
  .get(loginPage)
  .post(login);

router.route('/logout')
  .get(logout);

module.exports = router;

