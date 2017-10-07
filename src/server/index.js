var express = require("express");
var bodyParser = require("body-parser");
var couchbase = require("couchbase");
var path = require("path");
var config = require("./config");
var dotenv = require("dotenv");

dotenv.load();

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports.bucket = (
  new couchbase.Cluster(config.couchbase.server)).openBucket(config.couchbase.bucket);

app.use(express.static(path.resolve('build')));

var routes = require("./routes/routes.js")(app);

var server = app.listen(process.env.PORT, function () {
  console.log("Listening on port %s...", server.address().port);
});