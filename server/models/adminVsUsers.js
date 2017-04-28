//HOW TO MAKE ADMIN & USER ACCOUNTS:

//Add to Schema for Users:
isAdmin: { type: Boolean, default: false } //But how to make true?

//Middleware modification:
var requiresAdmin = function(){
  return[
          ensureLoggedIn('/login'), //"ensureLoggedIn" must be replaced...
          function(req, res, next) {
            if (req.user && req.user.isAdmin === true)
              next();
            else
              res.send(401, 'Unauthorized');
          }
        ];
};

//Pulling in admin-only routes
app.use('/admin/*', requiresAdmin());
//Then routes to Admin page using "/admin" (I think)