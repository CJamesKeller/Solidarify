//BASIC REQUIRES
var express = require("Express");
var router = express.Router();
var mongoose = require("mongoose");

//ORGANIZATION SCHEMA
var OrgSchema = mongoose.Schema({
  name  :  String,
  email :  String,
  site  :  String,
  desc  :  String
});
var Organizations = mongoose.model("Organizations", OrgSchema);

//CRUD ROUTES (GET, POST, PUT, DELETE)
router.get("/", function(req, res){
  Organizations.find({}, function(err, allOrganizations){ //{key: value}
    if(err){
      console.log(err);
      res.sendStatus(500);
    }
    else{
      res.send(allOrganizations);
    }
  });
});

router.post("/add", function(req, res){
  var thisOrg = new Organizations();
  thisOrg.id    = req.body.id;
  thisOrg.name  = req.body.name;
  thisOrg.email = req.body.email;
  thisOrg.site  = req.body.site;
  thisOrg.desc  = req.body.desc;
  thisOrg.save(function(err, savedOrg){
    if(err){
      console.log(err);
      res.sendStatus(500);
    }
    else{
      res.send(savedOrg);
    }
  });
});

router.put("/edit/:id", function(req, res){
  var id = req.params.id;
  Organizations.findById(req.params.id, function(err, updatedOrg){
    if(err){
      console.log(err);
      res.sendStatus(500);
    }
    else{
      updatedOrg.name   =   req.body.name   ||  updatedOrg.name;
      updatedOrg.email  =   req.body.email  ||  updatedOrg.email;
      updatedOrg.site   =   req.body.site   ||  updatedOrg.site;
      updatedOrg.desc   =   req.body.desc   ||  updatedOrg.desc;
      updatedOrg.save(function(err, updatedOrg){
        if(err){
          console.log(err);
          res.sendStatus(500);
        }
        else{
          res.send(updatedOrg);
        }
      });
    }
  });
});

router.delete("/delete/:id", function(req, res){
  var id = req.params.id;
  Organizations.findByIdAndRemove(id, function(err, deletedOrg){
    if(err){
      console.log(err);
      res.sendStatus(500);
    }
    else{
      res.send(deletedOrg);
    }
  });
});

module.exports = router;
