let uuid = require("uuid");
let db = require("../index").bucket;
let config = require("../config");
let couchbase = require("couchbase");
let dotenv = require('dotenv').config();

function RecordModel() { }

let N1qlQuery = couchbase.N1qlQuery;

RecordModel.save = function(data, callback) {
  let jsonObject = {
    email: data.email,
    vault: data.vault
  };

  let documentId = data.docId ? data.docId : uuid.v4();
  db.upsert(documentId, jsonObject, function(error, result) {
    if(error) {
      callback(error, null);
      return;
    }
    callback(null, {message: "success", data: result});
  });
};

RecordModel.checkId = function(id, callback) {
  db.get(id, function(err, result) {
    if (err) {
      if (err.code == couchbase.errors.keyNotFound) {
        console.log('Key does not exist');
        return callback(err, null);
      } else {
        console.log('Some other error occurred: %j', err);
        return callback(err, null);
      }
    } else {
      console.log('Retrieved document with value: %j', result.value);
      console.log('CAS is %j', result.cas);
      callback(null, result);
    }
  });
};

RecordModel.getDocIdByEmail = function(email, callback) {
  let statement = "select meta("+process.env.BUCKET_QUERY+").id from `"+process.env.BUCKET_QUERY+"` where email = '"+email+"';";
  let query = N1qlQuery.fromString(statement).consistency(N1qlQuery.Consistency.REQUEST_PLUS);
  db.query(query, function (error, result) {
    if(error) {
      console.log("error with query");
      return callback(error, null);
    }
    callback(null, result);
  })
};

RecordModel.getVaultByEmail = function(email, callback) {
  var statement = "select * from `"+process.env.BUCKET_QUERY+"` where email = '"+email+"';";
  var query = N1qlQuery.fromString(statement).consistency(N1qlQuery.Consistency.REQUEST_PLUS);
  db.query(query, function(error, result) {
    if(error) {
      console.log("error with query");
      return callback(error, null);
    }
    callback(null, result);
  });
};

RecordModel.getSitesByEmail = function(email, callback) {
  var statement = "select vault.sites from `"+process.env.BUCKET_QUERY+"` where email = '"+email+"';";
  var query = N1qlQuery.fromString(statement).consistency(N1qlQuery.Consistency.REQUEST_PLUS);
  db.query(query, function(error, result) {
    if(error) {
      console.log("error with query");
      return callback(error, null);
    }
    callback(null, result);
  });
};

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
