myApp.controller('InfoController', ['$scope', 'UserService', function($scope, UserService) {
  $scope.logout = UserService.logout;
}]);
