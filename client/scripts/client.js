var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider ) {
  $routeProvider
    .when('/index', {
      templateUrl: '/views/home.html',
      controller: "LoginController",
    })
    .when('/register', {
      templateUrl: '/views/register.html',
      controller: "LoginController"
    })
    .when('/manage', {
      templateUrl: '/views/manage.html',
      controller: "UserController",
      resolve: {  //Calls getuser before going to route
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/search', {
      templateUrl: '/views/search.html',
      controller: "InfoController",
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .otherwise({
      redirectTo: 'home'
    });
}]);
