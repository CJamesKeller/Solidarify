var myApp = angular.module('myApp', ['ngRoute']);
console.log("client running");
myApp.config(['$routeProvider', function($routeProvider ) {
  $routeProvider
    .when('/index', {
      templateUrl: '/views/home.html',
      controller: "HomeController",
    })
    .when('/register', {
      templateUrl: '/views/register.html',
      controller: "RegisterController"
    })
    .when('/admin', {
      templateUrl: '/views/admin.html',
      controller: "AdminController"
      // resolve: {  //Calls getuser before going to route
      //   getuser : function(UserService){
      //     return UserService.getuser();
      //   }
      // }
    })
    .when('/org', {
      templateUrl: '/views/organization.html',
      controller: "OrgController"
    })
    // .when('/search', {
    //   templateUrl: '/views/search.html',
    //   controller: "SearchController"
    // })
    .otherwise({
      redirectTo: 'index'
    });
}]);
