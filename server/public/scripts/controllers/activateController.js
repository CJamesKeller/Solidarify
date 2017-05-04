myApp.controller('ActivateController',
  ['$scope', '$http', '$location', '$routeParams', 'PermissionService',
  function($scope, $http, $location, $routeParams, PermissionService) {

  $scope.logout     = PermissionService.logout;
  $scope.code       = angular.copy(PermissionService.code);
  $scope.joinGroup  = PermissionService.joinGroup;

  if ( $routeParams.code !== undefined ) {
    $scope.code.tempCode = $routeParams.code;
  }
  // Else bounce user to log in screen
}]);
