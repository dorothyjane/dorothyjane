var url = require('url');
var express = require('express'); // takes care of http
var people = require('./people.json');
var _ = require('underscore');
var app = express();


// app.use happens on all requests
app.use(function(request, response, next){
  console.log(request.method + '  ' + request.url);
  next();
});
/*
app.get('/me', function(req, res, next){
  console.log("They have asekd for me.");
  next();
}, function(request, response, next){

  // interally writehead, write, end.. express has wrapped it up for us
  response.status(200).send("</h1> It's all about ME</h1>");
});

app.get('/person/:name', function(req, res, next){
  var myname = req.params.name;
  res.status(200).send("Hello " + myname);
});
*/
var getPeopleData = function (req, res, next) {
  req.people = people; // really i'd to some database etc.
  next();
}

var sendPeopleData = function(req, res, next){
  res.json(req.people);
}

var locationFilter = function (req, res, next) {
  // var query = url.parse(req.url).query; //url gives is an object
  var query = req.query.location;
  if(!query) { return next(); }

  req.people = _.filter(req.people, function(obj, index){
    return obj.location === query;
  });
  console.log(query);
  next();
}

app.get('/people', getPeopleData, locationFilter, sendPeopleData);


// * is any url... in order so this must happen last, above routes are fine
app.get('*', function(request, response, next){
  response.send(404, "NOT FOUND!!!!!!!!!!!");
})

app.listen(process.env.PORT);
