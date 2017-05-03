myApp.controller("AdminController",
  ["$scope", "$http", "$location", "LoginService", "RequestService",
  "MailService", "InfoService", function($scope, $http, $location, LoginService,
  RequestService, MailService, InfoService) {

  //ORG-REQUEST FUNCTIONALITY
  RequestService.getReqs();
  $scope.allReqs = RequestService.allReqs;
  $scope.deleteReq = RequestService.deleteReq;

  //INFO FUNCTIONALITY

  // thisEvent = {
  //   name    : String,
  //   time    : Date,
  //   desc    : String,
  //   creator : String,
  //   orgs    : Array
  // };
  // thisOrg = {
  //   name  :  String,
  //   email :  String,
  //   site  :  String,
  //   desc  :  String
  // };

    //ORGANIZATIONS
  InfoService.getOrgs();
  $scope.newOrg = InfoService.newOrg;
  $scope.allOrgs = InfoService.allOrgs.orgArray;
  $scope.editOrg = InfoService.editOrg;
  $scope.deleteOrg = InfoService.deleteOrg;
    //EVENTS
  InfoService.getEvents();
  $scope.newEvent = InfoService.newEvent;
  $scope.allEvents = InfoService.allEvents.eventArray;
  $scope.editEvent = InfoService.editEvent;
  $scope.deleteEvent = InfoService.deleteEvent;

  //MAILER FUNCTIONALITY
  /**
   * @param {object} info Contains the email address and message to be sent.
   */
  $scope.submitEmailForm = function(info) {
      MailService.sendEmail(info);
  };

  //LOGIN FUNCTIONALITY
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
