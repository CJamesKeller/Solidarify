var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var db = require("./modules/db.js");

app.set("port", (process.env.PORT || 5000));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("server/public"));
app.get("/", function(req, res){
  res.sendFile(path.resolve("server/public/views/index.html"));
});

app.listen(app.get("port"), function(){
    console.log("Listening on port: ", app.get("port"));
});

//***PASSPORT***
//***
var passport = require("./strategies/userStrategy");
var session = require("express-session");
//***
var index = require("./routes/index");
var user = require("./routes/user");
var register = require("./routes/register");
//***
app.use(session({
   secret: "secret",
   key: "user", // this is the name of the req.variable.
   resave: "true",
   saveUninitialized: false,
   cookie: { maxage: 60000, secure: false }
}));
//***
app.use(passport.initialize());
app.use(passport.session());
//***
app.use("/register", register);
app.use("/user", user);
app.use("/*", index);
//***
//***PASSPORT***

module.exports = app;
