var express = require("Express");
var router = express.Router();
var mongoose = require("mongoose");

var RequestSchema = mongoose.Schema({
  name : String,
  email : String,
  site : String,
  desc : String
});

var Requests = mongoose.model("Requests", RequestSchema);

router.get("/", function(req, res){
  Requests.find({}, function(err, allRequests){
    if(err){
      console.log(err);
      res.sendStatus(500);
    }
    else{
      res.send(allRequests);
    }
  });
});

router.post("/", function(req, res){
  console.log("request post function");
  var time1 = Date.now();
  var request = new Requests();
  request.id = req.body.id;
  request.name = req.body.name;
  request.email = req.body.email;
  request.site = req.body.site;
  request.desc = req.body.desc;
  request.save(function(err, savedRequest){
    if(err){
      console.log(err);
      res.sendStatus(500);
    }
    else{
      var time2 = Date.now();
      console.log("Here Scott: "+":"+ time1+":"+ time2);
      res.send(savedRequest);
    }
  });
});

router.delete("/:id", function(req, res){
  var id = req.params.id;
  Requests.findByIdAndRemove(id, function(err, deletedRequest){
    if(err){
      console.log(err);
      res.sendStatus(500);
    }
    else{
      console.log("delete success");
      res.send(deletedRequest);
    }
  });
});

module.exports = router;
