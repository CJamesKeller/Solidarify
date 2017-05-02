let express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    path = require("path");

router.get("/", function(req, res) {
  // check if logged in
  if ( req.isAuthenticated() ) {
    // send back user object
    res.send(req.user);
  }
  else {
    // failure best handled on the server. do redirect here.
    res.send(false);
  }
});

// clear all session information for this user
router.get("/logout", function(req, res) {
  // Use built-in log-out method
  req.logOut();
  res.sendStatus(200);
});

module.exports = router;
