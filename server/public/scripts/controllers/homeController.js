myApp.controller("HomeController",
  ["$scope", "$http", "$location", "LoginService", "RequestService",
  function($scope, $http, $location, LoginService, RequestService) {

  //ORG-REQUEST FUNCTIONALITY
  $scope.newRequest = RequestService.newRequest;
  $scope.newReqArray = RequestService.newReqArray;

  //LOGIN FUNCTIONALITY
  $scope.userObject = LoginService.userObject;
  $scope.logout = LoginService.logout;

  $scope.user = {
    username: "",
    password: ""
  };
  $scope.message = "";

  $scope.login = function() {
    if ( $scope.user.username === "" || $scope.user.password === "" ) {
      $scope.message = "Enter your username and password!";
    }
    else {
      $http.post("/", $scope.user).then(function(response) {
        if ( response.data.username === "SiteAdmin" ) {
          $location.path("/admin");
        }
        else if ( response.data.username ) {
          $location.path("/org");
        }
        else {
          $scope.message = "Wrong!!";
        }
      });
    }
  };
}]);
