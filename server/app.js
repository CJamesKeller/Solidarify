/**
* @fileoverview Server for Solidarify website w/ Nodemailer and Passport.
* @author Christopher Keller
*/

//REQUIRES:
//*********
    //INITIAL
let express       = require("express"),
    app           = express(),
    path          = require("path"),
    bodyParser    = require("body-parser"),
    db            = require("./modules/db.js"),
    //NODEMAILER
    nodemailer    = require("nodemailer"),
    //PASSPORT
    passport      = require("./strategies/userStrategy"),
    session       = require("express-session"),
    //PASSPORT ROUTES
    register      = require("./routes/register"),
    user          = require("./routes/user"),
    index         = require("./routes/index"),
    //MY PROJECT ROUTES
    configVars    = require("../config.json"),
    requests      = require("./routes/requests.js"),
    organizations = require("./routes/organizations.js"),
    events        = require("./routes/events.js");

//APP INITIALIZATION
app.set("port", (process.env.PORT || 5000));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("server/public"));

//***PASSPORT***
app.use(session({
   secret:  "secret",
   key:     "user", // this is the name of the req.variable.
   resave:  "true",
   cookie:  { maxage: 60000, secure: false },
   saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//***NODEMAILER***
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: configVars.emailAddress, //EMAIL
        pass: configVars.password  //PASSWORD
        //*** process.env.MAILPASS || *** FOR HEROKU
    }
});
app.post("/mail", function(req,res) {
    let mailer = req.body;
    console.log(mailer);
    let mailOptions = {
        // Formatted as: ' "NAME" EMAIL ' (w/single q's, too)
        from:     ' "Solidarify Admin" ' + configVars.emailAddress + ' ',
        to:       mailer.toEmail,
        subject:  mailer.subject,
        text:     mailer.message,
        html:     "<b>" + mailer.message + "</b>"
    };
    transporter.sendMail(mailOptions, function(error, info) {
        if ( error ) {
            return console.log(error);
        }
    });
    res.send(200);
});

//PROJECT ROUTES
app.use("/requests", requests);
app.use("/organizations", organizations);
app.use("/events", events);
app.use("/register", register);
app.use("/user", user);
app.use("/*", index);

//INDEX GET ROUTE
app.get("/", function(req, res) {
  res.sendFile(path.resolve("server/public/views/index.html"));
});

//LISTENING TO PORT
app.listen(app.get("port"), function() {
    console.log("Listening on port: ", app.get("port"));
});

//EXPORT MODULE
module.exports = app;
