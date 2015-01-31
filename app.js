var url = require('url');
var express = require('express'); // takes care of http
var _ = require('underscore');
var app = express();
var fs = require('fs');


// use jade, similar to haml but compiled with javascript ;)
app.set('view engine', 'jade');




// check for sesssion if go to place where need session
app.all('/admin/*', function(req, res, next){
  console.log(req.session);
  if(!req.session.admin){
    res.redirect('/login');
  } else {
    next();
  }
})



// homepage
app.get('/', function(request, response, next){
  // interally writehead, write, end.. express has wrapped it up for us
  //response.status(200).send("</h1>Welcome to DorothyJanes site.</h1><br/> It is currently under construction. Please come back soon.");
  response.render('index', {
      title: 'dorothy jane wingrove',
      subtitle: 'something about me',
      links: {
        twitter: "https://twitter.com/_dorothyjane",
        instagram: "http://instagram.com/dottiejane/",
        google: "https://plus.google.com/u/0/117368907696249336489/about"
      }
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

connection.connect(function(error){
  if(error){ throw error; }
  var port = process.env.PORT || 8080; // carefull this will work on 0 !!!!
  console.log("listening on port:  " + port);
  app.listen(port);
});

