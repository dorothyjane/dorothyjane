var connection = require('../database'); // up one, ina folder...
var express = require('express');
var router = new express.Router();
var blogs = require('../controller/blog');

router.route('/blog/:id')
  .get(blogs.getBlog);

router.route('/blog')
  .get(blogs.getBlogs);

module.exports = router;

