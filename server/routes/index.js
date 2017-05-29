let express   = require("express"),
    router    = express.Router(),
    passport  = require("passport"),
    path      = require("path");

router.post("/",
    passport.authenticate("local", { // 'local' points to login method
        successRedirect: "/user",    // goes to routes/user.js
        failureRedirect: "/"         // goes to get "/" route below
    })
);

router.get("/", function(req, res) {
  res.sendFile(path.resolve("server/public/views/index.html"));
});

module.exports = router;
