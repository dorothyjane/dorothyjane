var connection = require('../database'); // up one, ina folder...
var express = require('express');
var router = new express.Router();
var peoples = require('../controller/people');

router.route('/people/:id')
  .get(peoples.getPerson);

router.route('/people')
  .post(peoples.createPerson)
  .put(peoples.updatePerson)
  .get(peoples.getPeople);

module.exports = router;

