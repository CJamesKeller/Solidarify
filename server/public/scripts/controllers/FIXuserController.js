myApp.controller('UserController',
  ['$scope', '$http', '$location', 'UserService',
  function($scope, $http, $location, UserService) {

  $scope.newGroup = {};
  $scope.userObject = UserService.userObject;
  $scope.logout = UserService.logout;
  $scope.createGroup = UserService.createGroup;
  $scope.groups = UserService.groups;
  UserService.getGroups();
  $scope.baseURL = $location.$$protocol + '://' + $location.$$host + ':' + $location.$$port;
}]);
