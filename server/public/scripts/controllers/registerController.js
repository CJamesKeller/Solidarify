myApp.controller("RegisterController", ["$scope", "$http", "$location", "LoginService", function($scope, $http, $location, LoginService) {

  $scope.userObject = LoginService.userObject;
  $scope.logout = LoginService.logout;

  $scope.user = {
    username: "",
    password: ""
  };
  $scope.message = "";

  $scope.login = function() {
    if ( $scope.user.username === "" || $scope.user.password === "" ) {
      $scope.message = "Enter your username and password!";
    }
    else {
      $http.post("/", $scope.user).then(function(response) {
        if ( response.data.username ) {
          // location works with SPA (ng-route)
          $location.path("/user"); //angular service managing redirects
        }
        else {
          $scope.message = "Wrong!!";
        }
      });
    }
  };

  $scope.registerUser = function() {
    if ( $scope.user.username === "" || $scope.user.password === "" ) {
      $scope.message = "Choose a username and password!";
    }
    else {
      $http.post("/register", $scope.user).then(function(response) {
        $location.path("/home");
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

// $scope.login = function() {
//   if($scope.user.username === '' || $scope.user.password === '') {
//     $scope.message = "Enter your username and password!";
//   } else {
//     console.log('sending to server...', $scope.user);
//     $http.post('/', $scope.user).then(function(response) {
//       if(response.data.username) {
//         console.log('success: ', response.data);
//
//         if(UserService.code.tempCode != undefined) {
//           // Do we have an activation code?
//           $location.path('/activate/' + UserService.code.tempCode);
//         } else {
//           // location works with SPA (ng-route)
//           $location.path('/user');
//         }
//       } else {
//         console.log('failure: ', response);
//         $scope.message = "Wrong!!";
//       }
//     });
//   }
// };
//
// $scope.registerUser = function() {
//   if($scope.user.username === '' || $scope.user.password === '') {
//     $scope.message = "Choose a username and password!";
//   } else {
//     console.log('sending to server...', $scope.user);
//     $http.post('/register', $scope.user).then(function(response) {
//       console.log('success');
//       if(UserService.code.tempCode != undefined) {
//         // Do we have an activation code?
//         $location.path('/activate/' + UserService.code.tempCode);
//       } else {
//         // location works with SPA (ng-route)
//         $location.path('/user');
//       }
//     },
//     function(response) {
//       console.log('error');
//       $scope.message = "Please try again."
//     });
//   }
// }
