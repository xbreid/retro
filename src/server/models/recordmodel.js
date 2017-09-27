var uuid = require("uuid");
var db = require("../index").bucket;
var config = require("../config");
var N1qlQuery = require('couchbase').N1qlQuery;

function RecordModel() { };

/*RecordModel.delete = function(documentId, callback) {
  db.remove(documentId, function(error, result) {
    if(error) {
      callback(error, null);
      return;
    }
    callback(null, {message: "success", data: result});
  });
};*/

module.exports = RecordModel;
