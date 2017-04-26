var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider ) {
  $routeProvider
    .when('/home', {
      templateUrl: '/views/home.html',
      controller: "LoginController",
    })
    .when('/register', {
      templateUrl: '/views/register.html',
      controller: "LoginController"
    })
    .when('/user', {
      templateUrl: '/views/user.html',
      controller: "UserController",
      resolve: {  //This calls getuser before going to the route
        getuser : function(UserService){ //DON'T inject our own srvcs into config
          return UserService.getuser();
        }
      }
    })
    .when('/info', {
      templateUrl: '/views/info.html',
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
