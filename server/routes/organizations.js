/**
* @fileoverview Handles CRUD for Organizations.
* @author Christopher Keller
*/

//BASIC REQUIRES
let express   = require("Express"),
    router    = express.Router(),
    mongoose  = require("mongoose");

//ORGANIZATION SCHEMA
let OrgSchema = mongoose.Schema({
  userID : String,
  name   : String,
  email  : String,
  site   : String,
  desc   : String
});
let Organizations = mongoose.model("Organizations", OrgSchema);

//CRUD ROUTES (GET, POST, PUT, DELETE)
/**
 * @returns {object} Contains all organization objects.
 */
router.get("/", function(req, res) {
  Organizations.find({}, function(err, allOrganizations) { //{key: value}
    if ( err ) {
      console.log(err);
      res.sendStatus(500);
    }
    else {
      res.send(allOrganizations);
    }
  });
});

/**
 * @returns {object} Contains all organization objects.
 */
router.get("/this/:id", function(req, res) {
  console.log(req.params.id);
  Organizations.find({"userID": req.params.id}, function(err, thisOrg) { //{key: value}
    if ( err ) {
      console.log(err);
      res.sendStatus(500);
    }
    else {
      res.send(thisOrg);
    }
  });
});

/**
 * @returns {object} Contains all potential collaborator organization objects.
 */
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

/**
 * @returns {object} The saved organization.
 */
router.post("/", function(req, res) {
  let thisOrg = new Organizations();
  thisOrg.userID = req.body.id || "failed to get id";
  thisOrg.name   = req.body.username || "failed to get username";
  thisOrg.email  = req.body.email || "none";
  thisOrg.site   = req.body.site || "none";
  thisOrg.desc   = req.body.desc || "none";
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

/**
 * @returns {object} The updated organization.
 */
router.put("/edit/:id", function(req, res) {
  let id = req.params.id;
  Organizations.findById(req.params.id, function(err, updatedOrg) {
    if ( err ) {
      console.log(err);
      res.sendStatus(500);
    }
    else {
      console.log("req.body: ", req.body);
      updatedOrg.name   = req.body.wholeOrg.name   || updatedOrg.name;
      updatedOrg.email  = req.body.wholeOrg.email  || updatedOrg.email;
      updatedOrg.site   = req.body.wholeOrg.site   || updatedOrg.site;
      updatedOrg.desc   = req.body.wholeOrg.desc   || updatedOrg.desc;
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

/**
 * @returns {object} The deleted organization.
 */
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
