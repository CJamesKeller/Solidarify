myApp.controller('UserController', ['$scope', 'UserService', function($scope, UserService) {
  $scope.userObject = UserService.userObject;
  $scope.logout = UserService.logout;
}]);
