var session = require('express-session');
var connection = require('../../database'); // up one, ina folder...

exports.getBlogs = function(req, res){
  var params = [];
  var query = "select * from blogs"

  connection.query(query, params, function(err, results){
    if(err){
      return res.status(500).send("SQL filter gone wrong", err); // 500 is internal server error
    }

    var blogs = results;
    res.render('blog', {
      blogs: blogs,
      theme: 'style-one'
    });
  });
}

exports.getBlog = function(req, res){
  connection.query("select * from blogs where slug = ?", [req.params.slug], function(err, response){ // have to have function, is asynchronous
    if(err){
      return res.status(500).send("error finding blog");
    }
    var blog = response[0];
    if(!blog){
      return res.status(404).send("couldn't find blog!");
    }
    res.render('blog', {
      blog: blog
    });
  });
}

module.exports = exports;
