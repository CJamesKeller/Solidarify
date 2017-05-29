/**
* @fileoverview Handles CRUD for Organizations.
* @author Christopher Keller
*/

let express   = require("express"),
    router    = express.Router(),
    mongoose  = require("mongoose");

let OrgSchema = mongoose.Schema({
  desc   : String,
  email  : String,
  name   : String,
  site   : String,
  userID : String
});
let Organizations = mongoose.model("Organizations", OrgSchema);

router.get("/", function(req, res) {
  Organizations.find({}, function(err, allOrganizations) {
    if ( err ) {
      console.log(err);
      res.sendStatus(500);
    }
    else {
      res.send(allOrganizations);
    }
  });
});

router.get("/this/:id", function(req, res) {
  console.log(req.params.id);
  Organizations.find({"userID": req.params.id}, function(err, thisOrg) {
    if ( err ) {
      console.log(err);
      res.sendStatus(500);
    }
    else {
      res.send(thisOrg);
    }
  });
});

router.get("/collab/:id", function(req, res) {
  let orgID = req.params.id;
  Organizations.findOne({ "_id": orgID}, function(err, thisOrg) {
    if ( err ) {
      console.log(err);
      res.sendStatus(500);
    }
    else {
      res.send(thisOrg);
    }
  });
});

router.post("/", function(req, res) {
  let thisOrg = new Organizations();
  thisOrg.desc   = req.body.desc     || "none";
  thisOrg.email  = req.body.email    || "none";
  thisOrg.name   = req.body.username || "failed to get username";
  thisOrg.site   = req.body.site     || "none";
  thisOrg.userID = req.body.id       || "failed to get id";
  thisOrg.save(function(err, savedOrg) {
    if ( err ) {
      console.log(err);
      res.sendStatus(500);
    }
    else {
      console.log(savedOrg);
      res.send(savedOrg);
    }
  });
});

router.put("/edit/:id", function(req, res) {
  let id = req.params.id;
  Organizations.findById(req.params.id, function(err, updatedOrg) {
    if ( err ) {
      console.log(err);
      res.sendStatus(500);
    }
    else {
      updatedOrg.desc   = req.body.wholeOrg.desc   || updatedOrg.desc;
      updatedOrg.email  = req.body.wholeOrg.email  || updatedOrg.email;
      updatedOrg.name   = req.body.wholeOrg.name   || updatedOrg.name;
      updatedOrg.site   = req.body.wholeOrg.site   || updatedOrg.site;
      updatedOrg.save(function(err, savedOrg) {
        if ( err ) {
          console.log(err);
          res.sendStatus(500);
        }
        else {
          res.send(savedOrg);
        }
      });
    }
  });
});

router.delete("/delete/:id", function(req, res){
  let id = req.params.id;
  Organizations.findByIdAndRemove(id, function(err, deletedOrg) {
    if ( err ) {
      console.log(err);
      res.sendStatus(500);
    }
    else {
      res.send(deletedOrg);
    }
  });
});

module.exports = router;
