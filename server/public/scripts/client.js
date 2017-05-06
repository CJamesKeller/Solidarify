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
    .when("/admin", {
      templateUrl: "/views/templates/admin.html",
      controller: "AdminController",
      resolve: {
        isAdmin : function(LoginService) {
          return LoginService.isAdmin();
        }
      }
    })
    .when("/activate/:code", {
      templateUrl: '/views/templates/activate.html',
      controller: 'ActivateController',
    })
    .when("/register", {
      templateUrl: "/views/templates/register.html",
      controller: "RegisterController",
      // resolve: {
      //   permit : function(PermissionService) {
      //     return PermissionService.canRegister;
      //   }
      // }
    })
    .when("/org", {
      templateUrl: "/views/templates/organization.html",
      controller: "OrgController",
      resolve: {
        getuser : function(LoginService) {
          return LoginService.getuser();
        }
      }
    })
    .when('/collaborate/:code', {
      templateUrl: '/views/templates/collaborate.html',
      controller: 'CollaborateController',
      resolve: {
        getuser : ['UserService', function(UserService){
          return UserService.getuser();
        }]
      }
    })
    // .when("/search", {
    //   templateUrl: "/views/templates/search.html",
    //   controller: "SearchController"
    // })
    .otherwise({
      redirectTo: "index"
    });
}]);
