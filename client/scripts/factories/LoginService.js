myApp.factory("LoginService", ["$http", "$location", function($http, $location) {

  let userObject = {};

  return {
    userObject : userObject,

    getuser : function() {
      return $http.get("/user").then(function(response) {
          if ( response.data.username ) {
              // user has a curret session on the server
              userObject.userName = response.data.username;
              userObject.id = response.data._id;
          }
          else {
              // user has no session, bounce them back to the login page
              $location.path("/home");
          }
      });
    },

    isAdmin : function() {
      $http.get("/user").then(function(response) {
          if ( response.data.username === "SiteAdmin") {
              userObject.userName = response.data.username;
              $location.path("/admin");
          }
          else {
              // user has no session, bounce them back to the login page
              $location.path("/home");
          }
      });
    },

    logout : function() {
        $http.get("/user/logout").then(function(response) {
          $location.path("/home");
        });
    }
  };
}]);
