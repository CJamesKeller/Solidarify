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
  name  : String,
  email : String,
  site  : String,
  desc  : String
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
 * @returns {object} The saved organization.
 */
router.post("/add", function(req, res) {
  let thisOrg = new Organizations();
  thisOrg.id    = req.body.id;
  thisOrg.name  = req.body.name;
  thisOrg.email = req.body.email;
  thisOrg.site  = req.body.site;
  thisOrg.desc  = req.body.desc;
  thisOrg.save(function(err, savedOrg) {
    if ( err ) {
      console.log(err);
      res.sendStatus(500);
    }
    else {
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
      updatedOrg.name   = req.body.name   || updatedOrg.name;
      updatedOrg.email  = req.body.email  || updatedOrg.email;
      updatedOrg.site   = req.body.site   || updatedOrg.site;
      updatedOrg.desc   = req.body.desc   || updatedOrg.desc;
      updatedOrg.save(function(err, updatedOrg) {
        if ( err ) {
          console.log(err);
          res.sendStatus(500);
        }
        else {
          res.send(updatedOrg);
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
