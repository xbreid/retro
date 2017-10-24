let RecordModel = require("../models/recordmodel");
let jwt = require('express-jwt');
let jwks = require('jwks-rsa');
let dotenv = require('dotenv').config();

let jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: process.env.AUTH0_API_JWKSURI
  }),
  audience: process.env.AUTH0_API_AUDIENCE,
  issuer: process.env.AUTH0_API_ISSUER,
  algorithms: ['RS256']
});

let appRouter = function(app) {

  app.post("/api/save", jwtCheck, function(req, res) {
    RecordModel.save(req.body, function(error, result) {
      if(error) {
        return res.status(400).send(error);
      }
      res.send(result);
    });
  });

  app.get("/api/checkId", jwtCheck, function(req, res) {
    RecordModel.checkId(req.query.id, function(error, result) {
      if(error) {
        return res.status(400).send(error);
      }
      res.send(result);
    });
  });

  app.get("/api/getDocIdByEmail", jwtCheck, function(req, res) {
    RecordModel.getDocIdByEmail(req.query.email, function(error, result) {
      if(error) {
        return res.status(400).send(error);
      }
      res.send(result);
    });
  });

  app.get("/api/getVaultByEmail", jwtCheck, function(req, res) {
    RecordModel.getVaultByEmail(req.query.email, function(error, result) {
      if(error) {
        return res.status(400).send(error);
      }
      res.send(result);
    });
  });

  app.get("/api/getSitesByEmail", jwtCheck, function(req, res) {
    RecordModel.getSitesByEmail(req.query.email, function(error, result) {
      if(error) {
        return res.status(400).send(error);
      }
      res.send(result);
    });
  });

  app.get("/api/getNotesByEmail", jwtCheck, function(req, res) {
    RecordModel.getNotesByEmail(req.query.email, function(error, result) {
      if(error) {
        return res.status(400).send(error);
      }
      res.send(result);
    });
  });

  /*app.post("/api/delete", function(req, res) {
    if(!req.body.document_id) {
      return res.status(400).send({"status": "error", "message": "A document id is required"});
    }
    RecordModel.delete(req.body.document_id, function(error, result) {
      if(error) {
        return res.status(400).send(error);
      }
      res.send(result);
    });
  });*/

  app.get('/api/authorized', jwtCheck, function (req, res) {
    console.log('auth secured');
    res.send('Secured Resource');
  });

// end of appRouter
};

module.exports = appRouter;