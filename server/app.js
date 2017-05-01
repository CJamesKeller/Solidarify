/**
* @fileoverview Server for Solidarify website w/ Nodemailer and Passport.
* @author Christopher Keller
*/

//REQUIRES:
//*********
    //INITIAL
var express = require("express"),
    app = express(),
    path = require("path"),
    bodyParser = require("body-parser"),
    db = require("./modules/db.js"),
    //NODEMAILER
    nodemailer = require("nodemailer"),
    //PASSPORT
    passport = require("./strategies/userStrategy"),
    session = require("express-session"),
    //PASSPORT ROUTES
    register = require("./routes/register"),
    user = require("./routes/user"),
    index = require("./routes/index"),
    //NODE-EMAIL-VERIFICATION
    mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    userModel = require("./models/user"),
    nev = require('email-verification')(mongoose),
    //MY PROJECT ROUTES
    requests = require("./routes/requests.js"),
    organizations = require("./routes/organizations.js"),
    events = require("./routes/events.js");

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
//***
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
    console.log(mailer);
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

//***NODE-EMAIL-VERIFICATION***
//*****************************
//***
//Configuration of email verification
nev.configure({
  //URL for verification
    verificationURL: 'http://example.com/email-verification/${URL}', //CHANGE THIS
    URLLength: 48, //NOT IN EXAMPLE
  //Mongo-related
    persistentUserModel: userModel,
    tempUserModel: null, //NOT IN EXAMPLE
    tempUserCollection: 'solidarify_tempusers', //NOT IN EXAMPLE
    emailFieldName: 'email', //NOT IN EXAMPLE
    passwordFieldName: 'password',
    URLFieldName: 'GENERATED_VERIFYING_URL', //NOT IN EXAMPLE
    expirationTime: 86400,
  //Email options
    transportOptions: {
        service: 'Gmail',
        auth: {
            user: 'user@gmail.com', //CHANGE THIS
            pass: 'password' //CHANGE THIS
        }
    },
    verifyMailOptions: {
        from: 'Do Not Reply <user@gmail.com>', //CHANGE THIS
        subject: 'Confirm your account',
        html: '<p>Please verify your account by clicking <a href="${URL}">this link</a>. If you are unable to do so, copy and ' +
                'paste the following link into your browser:</p><p>${URL}</p>',
        text: 'Please verify your account by clicking the following link, or by copying and pasting it into your browser: ${URL}'
    }, //NOT IN EXAMPLE
    shouldSendConfirmation: true,
    confirmMailOptions: {
        from: 'Do Not Reply <user@gmail.com>', //CHANGE THIS
        subject: 'Successfully verified!',
        html: '<p>Your account has been successfully verified.</p>',
        text: 'Your account has been successfully verified.'
    }, //NOT IN EXAMPLE
  //Hashing for security
    hashingFunction: myHasher,
  },
    function(err, options) {
      if (err) {
        console.log(err);
        return;
      }

      console.log('configured: ' + (typeof options === 'object'));
    });
//***
//*** CHOOSE ONE OF THE TWO BELOW ***
// // sync version of hashing function
// var myHasher = function(password, tempUserData, insertTempUser, callback) {
//   var hash = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
//   return insertTempUser(hash, tempUserData, callback);
// };
//*** OR
// async version of hashing function
var myHasher = function(password, tempUserData, insertTempUser, callback) {
  bcrypt.genSalt(8, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      return insertTempUser(hash, tempUserData, callback);
    });
  });
};
//***
//Generate temporary user model
nev.generateTempUserModel(userModel, function(err, tempUserModel) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('generated temp user model: ' + (typeof tempUserModel === 'function'));
});
//***
//Attempt to create new temp user
app.post('/', function(req, res) {
  var email = req.body.email;

  //Register button was clicked
  if (req.body.type === 'register') {
    var password = req.body.password;
    var newUser = new User({
      email: email,
      password: password
    });
    //Actually creates new temp user
    nev.createTempUser(newUser, function(err, existingPersistentUser, newTempUser) {
      if (err) {
        return res.status(404).send('ERROR: creating temp user FAILED');
      }
      //User already exists in persistent collection
      if (existingPersistentUser) {
        return;
      }
      //New user
      if (newTempUser) {
        var URL = newTempUser[nev.options.URLFieldName];
        //Actually sends the verification email
        nev.sendVerificationEmail(email, URL, function(err, info) {
          if (err) {
            return res.status(404).send('ERROR: sending verification email FAILED');
          }
          return;
        });
      }
      //User already exists in temporary collection
      else {
        return;
      }
    });
  //Button click to resend verification
  }
  else {
    nev.resendVerificationEmail(email, function(err, userFound) {
      if (err) {
        return res.status(404).send('ERROR: resending verification email FAILED');
      }
      if (userFound) {
        return;
      }
      else {
        return;
      }
    });
  }
});
//***
//Verification URL has been accessed
app.get('/email-verification/:URL', function(req, res) {
  var url = req.params.URL;
  //Confirm the new user
  nev.confirmTempUser(url, function(err, user) {
    if (user) {
      nev.sendConfirmationEmail(user.email, function(err, info) {
        if (err) {
          return res.status(404).send('ERROR: sending confirmation email FAILED');
        }
        return;
      });
    } else {
      return res.status(404).send('ERROR: confirming temp user FAILED');
    }
  });
});
//*****************************
//***NODE EMAIL VERIFICATION***

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
