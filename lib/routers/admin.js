var express = require('express');
var blogs = require('../controller/admin/blog');
var router = new express.Router();

function indexPage(req, res){
  res.render('../views/admin/index');
}

function newBlog(req, res){
  res.render('../views/admin/blog/new');
}

router.route('/admin/index')
  .get(indexPage);

router.route('/admin/blog/new')
  .get(newBlog);

router.route('/admin/blog/:id')
  .get(blogs.getBlog)
  .put(blogs.updateBlog);

router.route('/admin/blog')
  .post(blogs.createBlog)
  .get(blogs.getBlogs);


module.exports = router;

