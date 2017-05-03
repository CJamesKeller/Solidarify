myApp.controller('ActivateController', ['$scope', '$http', '$location',
  '$routeParams', 'UserService',
  function($scope, $http, $location, $routeParams, UserService) {

  $scope.logout = UserService.logout;
  $scope.code = angular.copy(UserService.code);
  $scope.joinGroup = UserService.joinGroup;
  if ( $routeParams.code !== undefined ) {
    $scope.code.tempCode = $routeParams.code;
  }
  // bouncing user to log in screen
}]);
