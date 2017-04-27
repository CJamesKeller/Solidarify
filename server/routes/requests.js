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
  Requests.find({}, function(err, allRequests){ //{key: value}
    if(err){
      console.log(err);
      res.sendStatus(500);
    }
    else{
      res.send(allRequests);
    }
  });
});

router.post("/add", function(req, res){
  console.log("request post function");

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
      res.send(savedRequest);
    }
  });
});

router.delete("/delete/:id", function(req, res){
  var id = req.params.id;
  Requests.findByIdAndRemove(id, function(err, deletedRequest){
    if(err){
      console.log(err);
      res.sendStatus(500);
    }
    else{
      res.send(deletedRequest);
    }
  });
});

module.exports = router;
