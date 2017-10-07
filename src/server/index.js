var express = require("express");
var bodyParser = require("body-parser");
var couchbase = require("couchbase");
var path = require("path");
var config = require("./config");
var dotenv = require('dotenv').config();

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports.bucket = (
  new couchbase.Cluster(config.couchbase.server))
  .openBucket(process.env.BUCKET, process.env.BUCKET_PASS, function(err) {
    if (err) {
      console.error('Database connection error: %j', err);
    }
});

app.use(express.static(path.resolve('build')));

var routes = require("./routes/routes.js")(app);

var server = app.listen(process.env.PORT, function () {
  console.log("Listening on port %s...", server.address().port);
});