var url = require('url');
var express = require('express'); // takes care of http
var _ = require('underscore');
var app = express();
var connection = require('./database');
// var multiparty = require('multiparty');
var bodyParser = require('body-parser');
var authRouter = require('./lib/routers/auth');
var adminRouter = require('./lib/routers/admin');
var session = require('cookie-session');
var fs = require('fs');
// var authenticationPassport = require('./lib/authentication');


// use jade, similar to haml but compiled with javascript ;)
app.set('view engine', 'jade');

// =================
// = sessions shit =
// =================

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

// body parse my params into json
app.use( bodyParser.urlencoded({ extended: false}) );

// check for sesssion if go to place where need session
app.all('/admin/*', function(req, res, next){
  console.log(req.session);
  if(!req.session.admin){
    res.redirect('/login');
  } else {
    next();
  }
})

// ==================
// = use my routers =
// ==================

// authentication
// app.use(authRouter);
// admin pages
app.use(adminRouter);

// homepage
app.get('/', function(request, response, next){
  // interally writehead, write, end.. express has wrapped it up for us
  //response.status(200).send("</h1>Welcome to DorothyJanes site.</h1><br/> It is currently under construction. Please come back soon.");
  response.render('index', {
      title: 'dorothy jane wingrove',
      links: {
        twitter: "https://twitter.com/_dorothyjane",
        instagram: "http://instagram.com/dottiejane/",
        google: "https://plus.google.com/u/0/117368907696249336489/about",
        user: "/",
        book: "/"
      }
    });
});

app.get('/feed', function(request, response, next){
  response.render('feed', {
    twitter_id: ''
  });
});

// static folder directory (telling the browser where to look)
app.use(express.static(__dirname + '/assets'));

// * is any url... in order so this must happen last, above routes are fine
app.get('*', function(request, response, next){
  response.send(404, "NOT FOUND!!!!!!!!!!!");
})

// <3 <3 <3 <3
// <3  GO!! <3
// <3 <3 <3 <3

connection.getConnection(function(error){
  if(error){ throw error; }
  var port = process.env.PORT || 8080; // carefull this will work on 0 !!!!
  app.listen(port);
});

