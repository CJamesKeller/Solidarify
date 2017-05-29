myApp.controller("AdminController",
  ["$scope", "$http", "$location", "LoginService", "RequestService",
  "MailService", "InfoService", "PermissionService",
  function($scope, $http, $location, LoginService,
  RequestService, MailService, InfoService, PermissionService) {

  //ORG-REQUEST FUNCTIONALITY
  RequestService.getReqs();
  $scope.allReqs    = RequestService.allReqs;
  $scope.deleteReq  = RequestService.deleteReq;

  //ORGANIZATIONS
  InfoService.getOrgs();
  $scope.allOrgs    = InfoService.allOrgs;
  $scope.deleteOrg  = InfoService.deleteOrg;
  $scope.editOrg    = InfoService.editOrg;
  $scope.newOrg     = InfoService.newOrg;

  //EVENTS
  InfoService.getEvents();
  $scope.allEvents    = InfoService.allEvents;
  $scope.deleteEvent  = InfoService.deleteEvent;
  $scope.editEvent    = InfoService.editEvent;
  $scope.newEvent     = InfoService.newEvent;

  //MAILER FUNCTIONALITY
  
  /**
   * @param {object} info Contains the email address and message to be sent.
   */
  $scope.submitEmailForm = function(info) {
      MailService.sendEmail(info);
  };

  //LOGIN FUNCTIONALITY
  $scope.userObject = LoginService.userObject;
  $scope.logout     = LoginService.logout;

  $scope.user = {
    username: "",
    password: ""
  };
  $scope.message = "";

  //PERMISSION FUNCTIONALITY
  $scope.baseURL = $location.$$protocol + '://' +
                      $location.$$host + ':' + $location.$$port;
  /**
   * @param {string} email Contains the email address for the code recipient.
   */
  $scope.createInvite = function(email) {
    let newInviteObj,
        newInviteCode,
        mailObject;
    PermissionService.createInvite().then(function(createdInvite) {
      newInviteCode = createdInvite.data.code;
      mailObject    = {
            toEmail: email,
            subject: "Welcome to Solidarify!",
            message: "Please click the link to register your account: <a href='" +
              $scope.baseURL + "/#!/activate/" + newInviteCode + "'>Register</a>."
          };
      MailService.sendEmail(mailObject);
    });
  };

}]);
