var RecordModel = require("../models/recordmodel");
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://reactpm.auth0.com/.well-known/jwks.json"
  }),
  audience: 'https://reactpm.com',
  issuer: "https://reactpm.auth0.com/",
  algorithms: ['RS256']
});

var appRouter = function(app) {

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

  app.get('/authorized', jwtCheck, function (req, res) {
    console.log('auth secured');
    res.send('Secured Resource');
  });

// end of appRouter
};

module.exports = appRouter;