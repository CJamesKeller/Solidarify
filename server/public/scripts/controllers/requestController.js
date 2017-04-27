myApp.controller('RequestController', ['$scope', 'AdminService', function($scope, AdminService) {
  $scope.newRequest = AdminService.newRequest;
  $scope.newReqArray = AdminService.newReqArray;
}]);
