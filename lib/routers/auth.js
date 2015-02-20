var express = require('express');
var bcrypt = require('bcrypt-nodejs');
var router = new express.Router();
var admin = require('../controller/admin');
var user = require('../controller/user');
var connection = require('../../database');

// views
function loginPage(req, res){
  res.render('login');
}

function adminLoginPage(req, res){
  res.render('adminLogin');
}

function signupPage(req, res){
  res.render('signup');
}

// login/logout
function adminLogin(req, res){
  connection.query("select * from persons where name =  ? and admin = 1", [
    req.body.name
  ], function(err, rows, fields){
    if(err){
      return res.status(500).send("name or password is incorrect");
    }
    if(rows.length < 1){
      return res.status(404).send("name or password is incorrect");
    }
    bcrypt.compare(req.body.password, rows[0].password, function(err, match) {
      if(err || !match){
        return res.status(401).send("name or password is incorrect");
      }
      req.session = {
        admin: {
          name: rows[0].name,
          id: rows[0].id
        }
      };
      res.redirect('/admin/index');
    });
  });
}

function login(req, res) {
    connection.query("select * from persons where name =  ? ", [
    req.body.name
  ], function(err, rows, fields){
    if(err){
      return res.status(500).send("name or password is incorrect");
    }
    if(rows.length < 1){
      return res.status(404).send("name or password is incorrect");
    }
    bcrypt.compare(req.body.password, rows[0].password, function(err, match) {
      if(err || !match){
        return res.status(401).send("name or password is incorrect");
      }
      req.session = {
        admin: {
          name: rows[0].name,
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
    res.redirect('/adminLogin');
  }
  if(req.session.user) {
    req.session.user = null;
    res.redirect('/login');
  }
  res.redirect('/index');
}

// signup
function signup(req, res){
  // var response = admin.createAdminUser(req, res, next);
  req.session.user = {name: req.createdUser.name, id: req.createAdminUser.id};
  res.redirect('/home');
}

router.route('/login')
  .get(loginPage)
  .post(login);
router.route('/signup')
  .get(signupPage)
  .post(user.createUser, signup);

router.route('/admin/login')
  .get(adminLoginPage)
  .post(adminLogin);

router.route('/logout')
  .get(logout);

module.exports = router;

