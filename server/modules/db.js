let mongoose = require("mongoose"),
    mongoURI = "mongodb://localhost:27017/general",
    MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on("error", function(err) {
  console.log("Mongo Connection Error: " + err);
});

MongoDB.once("open", function() {
  console.log("Connected to Mongo");
});

module.exports = MongoDB;
