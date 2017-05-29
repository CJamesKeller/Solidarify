let express   = require('express'),
    router    = express.Router(),
    Chance    = require('chance'),
    chance    = new Chance(),
    mongoose  = require('mongoose');

let PermissionSchema = mongoose.Schema({
    code  : {type: String},
    name  : {type: String},
    users : {type: Array}
});
let Permission = mongoose.model("Permissions", PermissionSchema);

router.get('/', function(req, res) {
  if ( req.isAuthenticated() ) {
    Permission.find({}, function(err, permissions) {
        if ( err ) {
          res.sendStatus(500);
        }
        res.send(permissions);
    });
  }
});

router.post('/create', function(req, res) {
  let name = req.body.name || "newInvitation";
  if ( req.isAuthenticated() ) {
    let permission = new Permission();
    permission.name   = name;
    permission.code   = chance.string({pool: 'abcdefghijklmnopqrstuvwxyz1234567890'});
    permission.users  = [];
    permission.save(function(err, savedPermission) {
      if ( err ) {
        res.sendStatus(500);
      }
      res.send(savedPermission);
    });
  }
  else {
    res.sendStatus(401);
  }
});

router.put('/join/:code', function(req, res) {
  let code = req.params.code;
  Permission.findOne({ 'code': code }, function(err, foundPermission) {
      if ( err ) {
        res.sendStatus(500);
      }
      foundPermission.save(function(err, savedPermission) {
        if ( err ) {
          res.sendStatus(500);
        }
        res.send(savedPermission);
      });
  });
});

router.put('/collaborate/:code', function(req, res) {
  let code = req.params.code;
  Permission.findOne({ 'code': code.tempCode }, function(err, foundPermission) {
      if ( err ) {
        res.sendStatus(500);
      }
      foundPermission.users.push(code.orgID);
      foundPermission.save(function(err, savedPermission) {
        if ( err ) {
          res.sendStatus(500);
        }
        res.send(savedPermission);
      });
  });
});

module.exports = router;
