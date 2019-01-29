'use strict';

var SwaggerExpress = require('swagger-express-mw');
var express = require('express');
var jsonata = require("jsonata");
// var fs = require('fs');
var app = express();
module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, UPDATE, DELETE, OPTIONS')
    res.header("Content-Type", "application/json");
    next();
  });

  var port = process.env.PORT || 10010;

  app.use(express.json());


  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }
});
