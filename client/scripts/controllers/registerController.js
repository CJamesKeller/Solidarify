myApp.controller("RegisterController",
  ["$scope", "$http", "$location", "PermissionService", "InfoService",
  function($scope, $http, $location, PermissionService, InfoService) {

  $scope.user = {
    username: "",
    password: ""
  };
  $scope.message = "";

  $scope.orgInfo = {
    id: "",
    username: "",
    email: "",
    website: "",
    desc: "",
  };

  $scope.registerUser = function() {
    if ( $scope.user.username === "" || $scope.user.password === "" ) {
      $scope.message = "Choose a username and password!";
    }
    else {
      $http.post("/register", $scope.user).then(function(response) {
        console.log(response);
        if ( PermissionService.code.tempCode !== undefined ) {
          $location.path('/activate/' + PermissionService.code.tempCode);
        }
        else {
          $http.post("/organizations", {
            "id"       : response.data._id,
            "username" : response.data.username,
            "email"    : $scope.orgInfo.email,
            "site"  : $scope.orgInfo.website,
            "desc"     : $scope.orgInfo.desc
          }).then(function(response) {
              console.log(response);
              $location.path("/home");
          });
        }
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
