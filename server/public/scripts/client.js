/**
* @fileoverview Routes pages w/ resolves as applicable.
* @author Christopher Keller
*/
let myApp = angular.module("myApp", ["ngRoute", "xeditable"]);

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
      // resolve: {                                 //FIX THIS ***
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
    .when("/collaborate/:code/:id", {
      templateUrl: '/views/templates/collaborate.html',
      controller: 'CollaborateController',
    })
    // .when("/search", {
    //   templateUrl: "/views/templates/search.html",
    //   controller: "SearchController"
    // })
    .otherwise({
      redirectTo: "index"
    });
}]);

myApp.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});
