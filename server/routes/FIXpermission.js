let express   = require('express'),
    router    = express.Router(),
    mongoose  = require('mongoose'),
    Chance    = require('chance'),
    chance    = new Chance();

let PermissionSchema = mongoose.Schema({
    name  : {type: String},
    code  : {type: String},
    users : {type: Array}
});
let Permission = mongoose.model("Permissions", PermissionSchema);

//*** CONFIRM IF ACCURATE ABOUT RETURNS ***

/**
 * @returns {object} Contains all permission objects.
 */
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

/**
 * @returns {object} The new saved permission.
 */
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

/**
 * @returns {object} The newly updated permission.
 */
router.put('/join/:code', function(req, res) {
  let code = req.params.code;
  Permission.findOne({ 'code': code }, function(err, foundPermission) {
      if ( err ) {
        res.sendStatus(500);
      }
      foundPermission.users.push(req.user._id);
      foundPermission.save(function(err, savedPermission) {
        if ( err ) {
          res.sendStatus(500);
        }
        res.send(savedPermission);
      });
  });
});

module.exports = router;
