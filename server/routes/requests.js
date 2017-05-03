/**
* @fileoverview Handles CRUD for organization Requests to join site.
* @author Christopher Keller
*/

//BASIC REQUIRES
let express = require("Express"),
    router = express.Router(),
    mongoose = require("mongoose");

//REQUEST SCHEMA
let RequestSchema = mongoose.Schema({
  name  :  String,
  email :  String,
  site  :  String,
  desc  :  String
});
let Requests = mongoose.model("Requests", RequestSchema);

//CRUD ROUTES (GET, POST, DELETE -- NO UPDATE)
/**
 * @returns {object} Contains all request objects.
 */
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

/**
 * @returns {object} The saved request.
 */
router.post("/", function(req, res) {
  let request = new Requests();
  request.id    = req.body.id;
  request.name  = req.body.name;
  request.email = req.body.email;
  request.site  = req.body.site;
  request.desc  = req.body.desc;
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

/**
 * @returns {object} The deleted request.
 */
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
