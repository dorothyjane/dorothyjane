var express = require('express');
var Minio = require('minio');

var S3_BUCKET = process.env.S3_BUCKET;
var S3_ENDPOINT = process.env.S3_ENDPOINT;

var router = new express.Router();
var blogs = require('../controller/admin/blog');

function indexPage(req, res){
  res.render('../views/admin/index');
}

function newBlog(req, res){
  res.render('../views/admin/blog/new');
}

function signS3(req, res){
  // const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];

  var s3Client = new Minio({
    endPoint:  S3_ENDPOINT,
    accessKey: process.env.AWS_ACCESS_KEY_ID,
    secretKey: process.env.AWS_SECRET_ACCESS_KEY,
    secure: false,
    port: 9000
  })

  s3Client.presignedPutObject(S3_BUCKET, `${fileName}_${Date.now()}`, 24*60*60, (err, presignedUrl) => {
    if(err){
      console.log('ERR ', err);
      return res.end();
    }

    res.write(JSON.stringify({url: presignedUrl}));
    res.end();
  });
}

router.route('/admin/index')
  .get(indexPage);

router.route('/admin/blog/new')
  .get(newBlog);

router.route('/admin/blog/:id')
  .get(blogs.getBlog)
  .put(blogs.updateBlog);

router.route('/admin/blog/:id/preview')
  .get(blogs.previewBlog);
  
router.route('/admin/blog')
  .post(blogs.createBlog)
  .get(blogs.getBlogs);

router.route('/admin/sign-s3?')
  .get(signS3);


module.exports = router;

