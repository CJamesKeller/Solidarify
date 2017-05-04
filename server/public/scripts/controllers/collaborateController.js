myApp.controller('CollaborateController',
  ['$scope', '$http', '$location', '$routeParams', 'PermissionService',
  function($scope, $http, $location, $routeParams, PermissionService) {

  //LOGIN FUNCTIONALITY
  $scope.userObject = LoginService.userObject;
  $scope.logout     = LoginService.logout;

  $scope.user = {
    username: "",
    password: ""
  };
  $scope.message = "";

  $scope.logout     = PermissionService.logout;
  $scope.code       = angular.copy(PermissionService.code);

  /**
   * @param {string} code The event permission allowing collaboration.
   */
  $scope.collaborate  = function(code) {
    let orgs = PermissionService.collaborate(code);
    $http.put("/events/collaborate/" + code, {"orgs": orgs}).then(function() {
      $location.path("/home");
    });
  };

  if ( $routeParams.code !== undefined ) {
    $scope.code.tempCode = $routeParams.code;
  }
  // Else bounce user to log in screen
}]);
