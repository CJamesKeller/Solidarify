/**
* @fileoverview Routes pages w/ resolves as applicable.
* @author Christopher Keller
*/
let myApp = angular.module("myApp", ["ngRoute"]);

myApp.config(["$routeProvider", function($routeProvider ) {
  $routeProvider
    .when("/index", {
      templateUrl: "/views/templates/home.html",
      controller: "HomeController",
    })
    .when("/register", {
      templateUrl: "/views/templates/register.html",
      controller: "RegisterController",
      // resolve: {
      //   getuser : function(LoginService) {    //ONLY IF TOKEN MATCHES
      //     return LoginService.getuser();
      //   }
      // }
    })
    .when("/admin", {
      templateUrl: "/views/templates/admin.html",
      controller: "AdminController",
      resolve: {
        isAdmin : function(LoginService) {
          return LoginService.isAdmin();
        }
      }
    })
    .when("/org", {
      templateUrl: "/views/templates/organization.html",
      controller: "OrgController",
      // resolve: {
      //   getuser : function(LoginService) {    //SEND TO THEIR OWN PAGE
      //     return LoginService.getuser();
      //   }
      // }
    })
    // .when("/search", {
    //   templateUrl: "/views/templates/search.html",
    //   controller: "SearchController"
    // })
    // Accept a route with an activation code as a parameter
    .when('/activate/:code', {
      templateUrl: '/views/templates/activate.html',
      controller: 'ActivateController',
      resolve: {
        getuser : ['UserService', function(UserService){
          return UserService.getuser();
        }]
      }
    })
    .otherwise({
      redirectTo: "index"
    });
}]);
