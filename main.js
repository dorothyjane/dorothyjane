var http = require('http'); // node hasit
var underscore = require('underscore'); // this is in my package.json
var mymodule = require('./mymodule'); // this is my own file
var fs = require('fs');

var server = http.createServer(); // this is a server

// listenin for you to hit it
// request -- object, javascript representation of the data that has been sent up to the server
// response -- how i talk back.. 200, 404.
  // some methods on response, writeHead(statusCode e.g. 200), write("blah")
server.on('request', function(request, response){
  // __dirname is where i am..
  // fs.readFileSync is synchrenous, gna block next line till it gets file...

  var html = fs.createReadStream(__dirname + '/index.html');
  // buffer is an array of bytes...
  console.log(request.url);
  response.writeHead(200);
  html.pipe(response); // piping to response, look upstairs

  // this puts on the screen -- slower than piping
  // response.write(html);
  // ok we are done -- has to end as you might want to write some html, then og off to a database, then write more html based on that, and then end. so yeah, that;s why we end
  // response.end();
});

// defaults to locahost
server.listen(3030); // port i'm listening on


// three types of stream in node readstreams, writestreams duplexerstreams
// readstream - read from, it pulls data down, need mroe yup ready for more
// write stream you push data into it

// old server code.... goes on server.on('request')
// buffer is an array of bytes...
// if(error){
//   response.write(404);
// } else {
//   console.log(request.url);
//   response.writeHead(200);
//   var html = file.toString();
//   response.write(html);
//   //ok we are done -- has to end as you might want to write some html, then og off to a database, then write more html based on that, and then end. so yeah, that;s why we end
//   response.end();
// }
