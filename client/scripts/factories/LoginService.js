myApp.factory("LoginService", ["$http", "$location", function($http, $location) {

  let userObject = {};

  return {
    userObject : userObject,

    getuser : function() {
      return $http.get("/user").then(function(response) {
          if ( response.data.username ) {
              userObject.userName = response.data.username;
              userObject.id = response.data._id;
          }
          else {
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
