myApp.controller('OrgController',
['$scope', '$http', '$location', 'LoginService', "MailService", "InfoService",
function($scope, $http, $location, LoginService, MailService, InfoService) {

  //Still need Info

  var mailer = this;
  mailer.submitForm = function(info){
      MailService.sendEmail(info);
  };

  $scope.userObject = LoginService.userObject;
  $scope.logout = LoginService.logout;

  $scope.user = {
    username: '',
    password: ''
  };
  $scope.message = '';

  $scope.login = function() {
    if($scope.user.username === '' || $scope.user.password === '') {
      $scope.message = "Enter your username and password!";
    } else {
      console.log('sending to server...', $scope.user);
      $http.post('/', $scope.user).then(function(response) {
        if(response.data.username) {
          console.log('success: ', response.data);
          // location works with SPA (ng-route)
          console.log('redirecting to user page');
          $location.path('/user'); //angular service managing redirects
        } else {
          console.log('failure: ', response);
          $scope.message = "Wrong!!";
        }
      });
    }
  };

  $scope.registerUser = function() {
    if($scope.user.username === '' || $scope.user.password === '') {
      $scope.message = "Choose a username and password!";
    } else {
      console.log('sending to server...', $scope.user);
      $http.post('/register', $scope.user).then(function(response) {
        console.log('success');
        $location.path('/home');
      },
      function(response) {
        console.log('error');
        $scope.message = "Please try again.";
      });
    }
  };
}]);
