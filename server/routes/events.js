/**
* @fileoverview Handles CRUD for Events.
* @author Christopher Keller
*/

let express   = require("express"),
    router    = express.Router(),
    mongoose  = require("mongoose");

let EventSchema = mongoose.Schema({
  code    : String,
  creator : String,
  desc    : String,
  name    : String,
  orgs    : Array,
  time    : String //TODO change to Date
});
let Events = mongoose.model("Events", EventSchema);

router.get("/", function(req, res) {
  Events.find({}, function(err, allEvents) {
    if ( err ) {
      console.log(err);
      res.sendStatus(500);
    }
    else {
      res.send(allEvents);
    }
  });
});

router.get("/my-events/:id", function(req, res) {
  let totalEvents = [],
      currentOrgId = req.params.id;
  Events.find({"creator": currentOrgId}, function(err, allMyEvents) {
    if ( err ) {
      console.log(err);
      res.sendStatus(500);
    }
    else {
      for (i = 0; i < allMyEvents.length; i++) {
        totalEvents.push(allMyEvents[i]);
      };
      Events.find({"orgs": currentOrgId}, function(err, allMyCollaborations) {
        if ( err ) {
          console.log(err);
          res.sendStatus(500);
        }
        else {
          for (i = 0; i < allMyCollaborations.length; i++) {
            totalEvents.push(allMyCollaborations[i]);
          };
          res.send(totalEvents);
        }
      });
    }
  });
});

router.post("/", function(req, res) {
  let uglyTime,
      betterTime,
      thisEvent;

  uglyTime = req.body.time;
  betterTime = uglyTime.slice(0, 10);

  thisEvent = new Events();
  thisEvent.code    = "noCode";
  thisEvent.creator = req.body.creator;
  thisEvent.desc    = req.body.desc;
  thisEvent.name    = req.body.name;
  thisEvent.time    = betterTime;
  thisEvent.orgs    = req.body.orgs || [];
  thisEvent.save(function(err, savedEvent) {
    if ( err ) {
      console.log(err);
      res.sendStatus(500);
    }
    else {
      res.send(savedEvent);
    }
  });
});

/**
 * @returns {object} The updated event.
 */
router.put("/edit", function(req, res) {
  let id = req.body._id;
  Events.findById(id, function(err, updatedEvent) {
    if ( err ) {
      console.log(err);
      res.sendStatus(500);
    }
    else {
      updatedEvent.code    = req.body.code     || updatedEvent.code;
      updatedEvent.creator = req.body.creator  || updatedEvent.creator;
      updatedEvent.desc    = req.body.desc     || updatedEvent.desc;
      updatedEvent.name    = req.body.name     || updatedEvent.name;
      updatedEvent.orgs    = req.body.orgs     || updatedEvent.orgs;
      updatedEvent.time    = req.body.time     || updatedEvent.time;
      updatedEvent.save(function(err, updatedEvent) {
        if ( err ) {
          console.log(err);
          res.sendStatus(500);
        }
        else {
          res.send(updatedEvent);
        }
      });
    }
  });
});

/**
 * @returns {object} The updated event.
 */
router.put("/finish/:id", function(req, res) {
  let id = req.params.id,
      newCode = req.body.code;
  Events.findById(req.params.id, function(err, thisEvent) {
    if ( err ) {
      console.log(err);
      res.sendStatus(500);
    }
    else {
      thisEvent.code = newCode;
      thisEvent.save(function(err, updatedEvent) {
        if ( err ) {
          console.log(err);
          res.sendStatus(500);
        }
        else {
          res.send(updatedEvent);
        }
      });
    }
  });
});

/**
 * @returns {object} The updated event.
 */
router.put("/collaborate/:eventCode", function(req, res) {
  let eventCode = req.params.eventCode;
  let orgID = req.body.orgID;
  Events.findOne({"code": eventCode}, function(err, updatedEvent) {
    if ( err ) {
      console.log(err);
      res.sendStatus(500);
    }
    else {
      thisEvent.orgs.push(orgID);
      updatedEvent.save(function(err, updatedEvent) {
        if ( err ) {
          console.log(err);
          res.sendStatus(500);
        }
        else {
          res.send(updatedEvent);
        }
      });
    }
  });
});

/**
 * @returns {object} The deleted event.
 */
router.delete("/delete/:id", function(req, res) {
  let id = req.params.id;
  Events.findByIdAndRemove(id, function(err, deletedEvent) {
    if ( err ) {
      console.log(err);
      res.sendStatus(500);
    }
    else {
      res.send(deletedEvent);
    }
  });
});

module.exports = router;
