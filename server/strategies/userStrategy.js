let passport = require("passport"),
    localStrategy = require("passport-local").Strategy,
    User = require("../models/user");

// Store user's unique id in session
// Only runs at authentication
// Stores info on req.session.passport.user
passport.serializeUser(function(user, done) {
  console.log("serialized: ", user);
  done(null, user.id);
});

// Runs on every request after authenticated
// Look up id in session to find them in the DB
// result stored on req.user
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    if ( err ) {
      done(err);
    }
    done(null, user);
  });
});

passport.use("local", new localStrategy({  //This is the method called local
  passReqToCallback: true,
  usernameField: "username"
  }, function(req, username, password, done) {
    User.findOne({username: username}, function(err, user) {
      if ( err ) {
        throw err;
      }
      // user passed from Mongoose if match found from findOne() above
      if ( !user ) {
        return done(null, false, {message: "Incorrect credentials."});
      }
      else {
        // check password
        // comparePassword() defined in model file
        user.comparePassword(password, function(err, isMatch) {
          if ( err ) {
            throw err;
          }
          if ( isMatch ) {
            return(done(null, user));
            //user.js in models decides what to do
            //with info (like go to next), with user
          }
          else {
            done(null, false, {message: "Incorrect credentials."});
          }
        });
      }
    });
  }
));

module.exports = passport;
