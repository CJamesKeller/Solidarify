let express   = require("express"),
    router    = express.Router(),
    passport  = require("passport"),
    path      = require("path");

router.get("/", function(req, res) {
  if ( req.isAuthenticated() ) {
    res.send(req.user);
  }
  else {
    res.send(false);
  }
});

router.get("/logout", function(req, res) {
  req.logOut(); // built-in method
  res.sendStatus(200);
});

module.exports = router;
