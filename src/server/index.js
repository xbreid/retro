let express = require("express");
let bodyParser = require("body-parser");
let couchbase = require("couchbase");
let path = require("path");
let config = require("./config");
let dotenv = require('dotenv').config();

let app = express();

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

let routes = require("./routes/routes.js")(app);

let server = app.listen(process.env.SERVER_PORT, function () {
  console.log("Listening on port %s...", server.address().port);
});