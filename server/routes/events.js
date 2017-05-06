/**
* @fileoverview Handles CRUD for Events.
* @author Christopher Keller
*/

//BASIC REQUIRES
let express   = require("Express"),
    router    = express.Router(),
    mongoose  = require("mongoose");

//EVENT SCHEMA
let EventSchema = mongoose.Schema({
  name    : String,
  time    : String, //***Eventually change to Date
  desc    : String,
  creator : String,
  code    : String,
  orgs    : Array
});
let Events = mongoose.model("Events", EventSchema);

//CRUD ROUTES (GET, POST, PUT, DELETE)
/**
 * @returns {object} Contains all event objects.
 */
router.get("/", function(req, res) {
  Events.find({}, function(err, allEvents) { //{key: value}
    if ( err ) {
      console.log(err);
      res.sendStatus(500);
    }
    else {
      res.send(allEvents);
    }
  });
});

/**
 * @returns {object} Contains all events for that organization.
 */
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

/**
 * @returns {object} The saved event.
 */
router.post("/", function(req, res) {
  let uglyTime,
      betterTime,
      thisEvent;

  uglyTime = req.body.time;
  betterTime = uglyTime.slice(0, 10);

  thisEvent = new Events();
  thisEvent.name    = req.body.name;
  thisEvent.time    = betterTime;
  thisEvent.desc    = req.body.desc;
  thisEvent.creator = req.body.creator;
  thisEvent.code    = "noCode";
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
router.put("/edit/:id", function(req, res) {
  let id = req.params.id;
  Events.findById(req.params.id, function(err, updatedEvent) {
    if ( err ) {
      console.log(err);
      res.sendStatus(500);
    }
    else {
      thisEvent.name    = req.body.name     || thisEvent.name;
      thisEvent.time    = req.body.time     || thisEvent.time;
      thisEvent.desc    = req.body.desc     || thisEvent.desc;
      thisEvent.creator = req.body.creator  || thisEvent.creator;
      thisEvent.code    = req.body.code     || thisEvent.code;
      thisEvent.orgs    = req.body.orgs     || thisEvent.orgs;
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
router.put("/collaborate/:code", function(req, res) {
  let code = req.params.code;
  Events.find({"code": code}, function(err, updatedEvent) {
    if ( err ) {
      console.log(err);
      res.sendStatus(500);
    }
    else {
      thisEvent.name    = req.body.name     || thisEvent.name;
      thisEvent.time    = req.body.time     || thisEvent.time;
      thisEvent.desc    = req.body.desc     || thisEvent.desc;
      thisEvent.creator = req.body.creator  || thisEvent.creator;
      thisEvent.code    = req.body.code     || thisEvent.code;
      thisEvent.orgs    = req.body.orgs     || thisEvent.orgs;
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
