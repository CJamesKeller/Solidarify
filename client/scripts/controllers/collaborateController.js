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

  $scope.logout = PermissionService.logout;
  $scope.code   = angular.copy(PermissionService.code);

  /**
   * @param {string} code The event permission allowing collaboration.
   */
  $scope.collaborate  = function(code) {
    PermissionService.collaborate(code).then(function(response) {
      console.log(response); //we need the permission id as it is the event code
      //we will then use this code to find the event by it and add this orgID
      let eventCode = response.data._id;
      $http.put("/events/collaborate/" + eventCode, {"orgID": code.orgID})
      .then(function(response) {
        $location.path("/home");
      });
    });
  };

  if ( $routeParams.code !== undefined ) {
    $scope.code.tempCode = $routeParams.code;
    $scope.code.orgID = $routeParams.id;
  }
  // Else bounce user to log in screen
}]);
