myApp.controller("RegisterController",
  ["$scope", "$http", "$location", "LoginService", "PermissionService",
  function($scope, $http, $location, LoginService, PermissionService) {

  $scope.userObject = LoginService.userObject;
  $scope.logout = LoginService.logout;

  $scope.user = {
    username: "",
    password: ""
  };
  $scope.message = "";

  $scope.registerUser = function() {
    if ( $scope.user.username === "" || $scope.user.password === "" ) {
      $scope.message = "Choose a username and password!";
    }
    else {
      $http.post("/register", $scope.user).then(function(response) {
        if ( PermissionService.code.tempCode !== undefined ) {
          $location.path('/activate/' + PermissionService.code.tempCode);
        }
        else {
          $location.path('/user');
        }
        $location.path("/home");
      },
      function(response) {
        $scope.message = "Please try again.";
      });
    }
  };

  /**
   * @param {string} emailResend The email address for resending verification to.
   */
  $scope.resend = function(emailResend) {
    $http.post("/register", emailResend).then(function(response) {
      $location.path("/home");
    });
  };

}]);
