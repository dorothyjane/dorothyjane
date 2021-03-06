var bcrypt = require('bcrypt-nodejs');
var session = require('express-session');
var connection = require('../../../database'); // up one, ina folder...

exports.createBlog = function(req, res){
  var params = req.body; // bodyparser put them here
  if(!params.name){
    return res.status(400).send("You must include a name");
  }
  var blog = {
    name : req.body.name,
    body : req.body.body,
    created_at: new Date()
  }; //  double make sure they don't put crap in!!!

  connection.query("insert into blogs set ?", blog, function(err, result){
    if(err){
      return res.status(500).send("error setting blog " + err + " ");
    }
    blog.id = result.insertId;
    res.redirect('/admin/blog');
  });
}

exports.getBlogs = function(req, res){
  var body = req.query.body;
  var query;
  var params = [];
  if(body){ // empty string is falsey
    query = "select * from blogs where name = ?";
    params.push(body);
  } else {
    query = "select * from blogs"
  }
  connection.query(query, params, function(err, results){
    if(err){
      return res.status(500).send("SQL filter gone wrong", err); // 500 is internal server error
    }
    res.render('admin/blog/index', {
      blogs: results
    });
  });
}

exports.updateBlog = function(req, res){
  connection.query('UPDATE blogs SET ? WHERE id = ?', [
      { name: req.body.name,
        body: req.body.body
      },
      req.params.id
    ],
    function(err, response){
      if(err){
        return res.status(500).send("error finding blog");
      }

      if(response.affectedRpws < 1){
        return res.status(404).send("couldn't find blog!");
      }
      res.redirect('/admin/blog/');
  });
}

exports.getBlog = function(req, res){
  connection.query("select * from blogs where id = ?", [req.params.id], function(err, response){ // have to have function, is asynchronous
    if(err){
      return res.status(500).send("error finding blog");
    }
    var blog = response[0];
    if(!blog){
      return res.status(404).send("couldn't find blog!");
    }
    res.render('admin/blog/edit', {
      blog: blog
    });
  });
}

exports.previewBlog = function(req, res){
  var query = "select * from blogs where id = ?";

  connection.query(query, [req.params.id], function(err, response){
    if(err){
      return res.status(500).send("error ginding blog", err); // 500 is internal server error
    }
    var blog = response[0];
    if(!blog){
      return res.status(404).send("couldn't find blog!");
    }

    response.render('index', {
      title: 'dorothy jane wingrove',
      theme: 'style-one',
      links: {
        github: "https://github.com/notthepoint",
        twitter: "https://twitter.com/notthepoint",
        instagram: "http://instagram.com/dottiejane/",
        codepen: "http://codepen.io/dorothy/",
      },
      blogs: [blog]
    });
  });
}

module.exports = exports;
