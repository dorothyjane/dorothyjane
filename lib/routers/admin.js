var express = require('express');
var router = new express.Router();

function indexPage(req, res){
  console.log('routers admin.js indexPage');
  res.render('../views/admin/index');
}

router.route('/admin/index')
  .get(indexPage);

module.exports = router;

