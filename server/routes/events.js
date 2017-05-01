/**
* @fileoverview Handles CRUD for Events.
* @author Christopher Keller
*/

//BASIC REQUIRES
var express = require("Express");
var router = express.Router();
var mongoose = require("mongoose");

//EVENT SCHEMA
var EventSchema = mongoose.Schema({
  name    : String,
  time    : Date,
  desc    : String,
  creator : String,
  orgs    : Array
});
var Events = mongoose.model("Events", EventSchema);

//CRUD ROUTES (GET, POST, PUT, DELETE)
router.get("/", function(req, res){
  Events.find({}, function(err, allEvents){ //{key: value}
    if(err){
      console.log(err);
      res.sendStatus(500);
    }
    else{
      res.send(allEvents);
    }
  });
});

router.post("/add", function(req, res){
  var thisEvent = new Events();
  thisEvent.id      = req.body.id;
  thisEvent.name    = req.body.name;
  thisEvent.time    = req.body.time;
  thisEvent.desc    = req.body.desc;
  thisEvent.creator = req.body.creator;
  thisEvent.orgs    = req.body.orgs;
  thisEvent.save(function(err, savedEvent){
    if(err){
      console.log(err);
      res.sendStatus(500);
    }
    else{
      res.send(savedEvent);
    }
  });
});

router.put("/edit/:id", function(req, res){
  var id = req.params.id;
  Events.findById(req.params.id, function(err, updatedEvent){
    if(err){
      console.log(err);
      res.sendStatus(500);
    }
    else{
      thisEvent.name    = req.body.name     || thisEvent.name;
      thisEvent.time    = req.body.time     || thisEvent.time;
      thisEvent.desc    = req.body.desc     || thisEvent.desc;
      thisEvent.creator = req.body.creator  || thisEvent.creator;
      thisEvent.orgs    = req.body.orgs     || thisEvent.orgs;
      updatedEvent.save(function(err, updatedEvent){
        if(err){
          console.log(err);
          res.sendStatus(500);
        }
        else{
          res.send(updatedEvent);
        }
      });
    }
  });
});

router.delete("/delete/:id", function(req, res){
  var id = req.params.id;
  Events.findByIdAndRemove(id, function(err, deletedEvent){
    if(err){
      console.log(err);
      res.sendStatus(500);
    }
    else{
      res.send(deletedEvent);
    }
  });
});

module.exports = router;
