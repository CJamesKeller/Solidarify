/**
* @fileoverview Handles CRUD for organization Requests to join site.
* @author Christopher Keller
*/

let express   = require("Express"),
    router    = express.Router(),
    mongoose  = require("mongoose");

let RequestSchema = mongoose.Schema({
  desc  : String,
  email : String,
  name  : String,
  site  : String
});
let Requests = mongoose.model("Requests", RequestSchema);

router.get("/", function(req, res) {
  Requests.find({}, function(err, allRequests) {
    if ( err ) {
      console.log(err);
      res.sendStatus(500);
    }
    else {
      res.send(allRequests);
    }
  });
});

router.post("/", function(req, res) {
  let request = new Requests();
  request.desc  = req.body.desc;
  request.email = req.body.email;
  request.id    = req.body.id;
  request.name  = req.body.name;
  request.site  = req.body.site;
  request.save(function(err, savedRequest) {
    if ( err ) {
      console.log(err);
      res.sendStatus(500);
    }
    else {
      res.send(savedRequest);
    }
  });
});

router.delete("/:id", function(req, res) {
  let id = req.params.id;
  Requests.findByIdAndRemove(id, function(err, deletedRequest) {
    if ( err ) {
      console.log(err);
      res.sendStatus(500);
    }
    else {
      res.send(deletedRequest);
    }
  });
});

module.exports = router;
