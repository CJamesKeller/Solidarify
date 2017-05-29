/**
* @fileoverview Server for Solidarify website w/ Nodemailer and Passport.
* @author Christopher Keller
*/

let bodyParser    = require("body-parser"),
    configVars    = require("../config.json"),
    db            = require("./modules/db.js"),
    events        = require("./routes/events.js"),
    express       = require("express"),
    app           = express(),
    index         = require("./routes/index"),
    nodemailer    = require("nodemailer"),
    organizations = require("./routes/organizations.js"),
    passport      = require("./strategies/userStrategy"),
    path          = require("path"),
    permission    = require("./routes/permission.js"),
    register      = require("./routes/register"),
    requests      = require("./routes/requests.js"),
    session       = require("express-session"),
    user          = require("./routes/user");

app.set("port", (process.env.PORT || 5000));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("server/public"));

// PASSPORT
app.use(session({
   secret:  "secret",
   key:     "user", // the req.variable
   resave:  "true",
   cookie:  { maxage: 60000, secure: false },
   saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// NODEMAILER
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAILADDR || configVars.emailAddress,
        pass: process.env.MAILPASS || configVars.password
    }
});
app.post("/mail", function(req,res) {
    let mailer = req.body;
    let mailOptions = {
        // Formatted as: ' "NAME" EMAIL ' (w/single quotes, too)
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

app.use("/events", events);
app.use("/organizations", organizations);
app.use("/permission", permission);
app.use("/register", register);
app.use("/requests", requests);
app.use("/user", user);
app.use("/*", index);

app.get("/", function(req, res) {
  res.sendFile(path.resolve("server/public/views/index.html"));
});

app.listen(app.get("port"), function() {
    console.log("Listening on port: ", app.get("port"));
});

module.exports = app;
