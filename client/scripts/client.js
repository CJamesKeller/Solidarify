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
      controller: "RegisterController"
    })
    .when("/admin", {
      templateUrl: "/views/admin.html",
      controller: "AdminController",
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when("/org", {
      templateUrl: "/views/organization.html",
      controller: "OrgController"
    })
    // .when("/search", {
    //   templateUrl: "/views/search.html",
    //   controller: "SearchController"
    // })
    .otherwise({
      redirectTo: "index"
    });
}]);
