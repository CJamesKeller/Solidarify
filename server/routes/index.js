var express = require("express");
var router = express.Router();
var passport = require("passport");
var path = require("path");

//Handles login form POST from index
router.post("/",
//local points to login method
    passport.authenticate("local", {
        successRedirect: "/user",   // goes to routes/user.js
        failureRedirect: "/"        // goes to get "/" route below
    })
);

//Catches any request not caught
router.get("/", function(req, res){
  res.sendFile(path.resolve("server/public/views/index.html"));
});

module.exports = router;
