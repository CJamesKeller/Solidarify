/**
* @fileoverview Server for Solidarify website w/ Nodemailer and Passport.
* @author Christopher Keller
*/

//BASIC REQUIRES
var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var db = require("./modules/db.js");

//NODEMAILER REQUIRE
var nodemailer = require("nodemailer");

//PASSPORT REQUIRES
var passport = require("./strategies/userStrategy");
var session = require("express-session");

//PASSPORT ROUTE REQUIRES
var register = require("./routes/register");
var user = require("./routes/user");
var index = require("./routes/index");

//PROJECT ROUTE REQUIRES
var requests = require("./routes/requests.js");
var organizations = require("./routes/organizations.js");
var events = require("./routes/events.js");

//APP INITIALIZATION
app.set("port", (process.env.PORT || 5000));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("server/public"));

//***PASSPORT***
//**************
app.use(session({
   secret:  "secret",
   key:     "user", // this is the name of the req.variable.
   resave:  "true",
   cookie:  { maxage: 60000, secure: false },
   saveUninitialized: false
}));
//***
app.use(passport.initialize());
app.use(passport.session());
//**************
//***PASSPORT***

//***NODEMAILER***
//****************
//Creates transporter using default SMTP
var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "", //EMAIL
        pass: ""  //PASSWORD
    }
});
//***
app.post("/mail", function(req,res){
    var mailer = req.body;
    var mailOptions = {
        from:     ' "" ', // Formatted as: ' "NAME" EMAIL ' (w/single q's, too)
        to:       mailer.toEmail,
        subject:  mailer.subject,
        text:     mailer.message,
        html:     "<b>" + mailer.message + "</b>"
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            return console.log(error);
        }
    });
    res.send(200);
});
//****************
//***NODEMAILER***

//PROJECT ROUTES
app.use("/requests", requests);
app.use("/organizations", organizations);
app.use("/events", events);
app.use("/register", register);
app.use("/user", user);
app.use("/*", index);

//INDEX GET ROUTE
app.get("/", function(req, res){
  res.sendFile(path.resolve("server/public/views/index.html"));
});

//LISTENING TO PORT
app.listen(app.get("port"), function(){
    console.log("Listening on port: ", app.get("port"));
});

//EXPORT MODULE
module.exports = app;
