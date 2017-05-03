/**
* @fileoverview Routes pages w/ resolves as applicable.
* @author Christopher Keller
*/
let myApp = angular.module("myApp", ["ngRoute"]);

myApp.config(["$routeProvider", function($routeProvider ) {
  $routeProvider
    .when("/index", {
      templateUrl: "/views/home.html",
      controller: "HomeController",
    })
    .when("/register", {
      templateUrl: "/views/register.html",
      controller: "RegisterController",
      // resolve: {
      //   getuser : function(LoginService) {    //ONLY IF TOKEN MATCHES
      //     return LoginService.getuser();
      //   }
      // }
    })
    .when("/admin", {
      templateUrl: "/views/admin.html",
      controller: "AdminController",
      resolve: {
        isAdmin : function(LoginService) {
          return LoginService.isAdmin();
        }
      }
    })
    .when("/org", {
      templateUrl: "/views/organization.html",
      controller: "OrgController",
      // resolve: {
      //   getuser : function(LoginService) {    //SEND TO THEIR OWN PAGE
      //     return LoginService.getuser();
      //   }
      // }
    })
    // .when("/search", {
    //   templateUrl: "/views/search.html",
    //   controller: "SearchController"
    // })
    .otherwise({
      redirectTo: "index"
    });
}]);
