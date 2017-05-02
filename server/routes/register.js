let express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    Users = require("../models/user"),
    path = require("path");

// Handles request for HTML file
router.get("/", function(req, res) {
  res.sendFile(path.resolve("server/public/views/register.html"));
});

// Handles POST request with new user data
router.post("/", function(req, res, next) {
    Users.create(req.body, function(err, post) {
         if ( err ) {
           // next() routes to routes/index.js
           next(err);
         }
         else {
          // route a new GET "/" request
          res.redirect("/");
        } //Redirects to the login page ("index")
    });
});

module.exports = router;
