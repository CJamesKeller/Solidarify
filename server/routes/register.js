let express   = require("express"),
    router    = express.Router(),
    passport  = require("passport"),
    path      = require("path"),
    Users     = require("../models/user");

router.get("/", function(req, res) {
  res.sendFile(path.resolve("server/public/views/register.html"));
});

// Handles POST request with new user data
router.post("/", function(req, res, next) {
    Users.create(req.body, function(err, post) {
         if ( err ) {
           next(err); // to routes/index.js
         }
         else {
          res.send(post); // Redirects to the login page ("index")
        }
    });
});

module.exports = router;
