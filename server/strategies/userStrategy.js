let localStrategy = require("passport-local").Strategy,
    passport      = require("passport"),
    User          = require("../models/user");

// Store user's unique id in session
// Only runs at authentication
// Stores info on req.session.passport.user
passport.serializeUser(function(user, done) {
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

passport.use("local", new localStrategy({  //The method 'local'
  passReqToCallback: true,
  usernameField: "username"
  }, function(req, username, password, done) {
    User.findOne({username: username}, function(err, user) {
      if ( err ) {
        throw err;
      }
      else if ( !user ) {
        return done(null, false, {message: "Incorrect credentials."});
      }
      else {
        // comparePassword() is defined in model file
        user.comparePassword(password, function(err, isMatch) {
          if ( err ) {
            throw err;
          }
          else if ( isMatch ) {
            return(done(null, user));
            // user.js model determines what to do with user info
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
