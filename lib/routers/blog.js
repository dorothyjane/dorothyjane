var express = require('express');
var router = new express.Router();
var blogs = require('../controller/blog');

router.route('/blog/:slug')
  .get(blogs.getBlog);

router.route('/blogs')
  .get(blogs.getBlogs);

module.exports = router;

