let mongoose  = require("mongoose"),
    mongoURI  = "",
    MongoDB;

setMongo = function() {
  if ( process.env.MONGODB_URI !== undefined ) {
      mongoURI = process.env.MONGODB_URI;
  }
  else {
      mongoURI = 'mongodb://localhost:27017/general';
  }

  MongoDB = mongoose.connect(mongoURI).connection;
};
setMongo();

MongoDB.on("error", function(err) {
  console.log("Mongo Connection Error: " + err);
});

MongoDB.once("open", function() {
  console.log("Connected to Mongo");
});

module.exports = MongoDB;
