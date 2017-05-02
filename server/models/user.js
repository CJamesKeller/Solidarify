let mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    bcrypt = require("bcrypt"),
    SALT_WORK_FACTOR = 10;

let UserSchema = new Schema({
    username: {type: String, required: true, index: {unique: true}},
    password: {type: String, required: true}
});

UserSchema.pre("save", function(next) { //"next" is an optional third param
    let user = this;                    //  made available by node & express

    if ( !user.isModified("password") ) {
      return next();
    }
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if ( err ) {
          return next(err);
        }
        bcrypt.hash(user.password, salt, function(err, hash) {
            if ( err ) {
              return next(err);
            }
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, callback) {
    // "this" refers to instance of User model
    // "callback" refers to entire function in userStrategy
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if ( err ) {
          return callback(err);
        }
        callback(null, isMatch);
    });
};

module.exports = mongoose.model("User", UserSchema);
