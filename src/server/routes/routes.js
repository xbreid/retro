var RecordModel = require("../models/recordmodel");

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

// end of appRouter
};

module.exports = appRouter;