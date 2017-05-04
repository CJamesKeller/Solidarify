myApp.controller("OrgController",
  ["$scope", "$http", "$location", "LoginService", "MailService", "InfoService",
  "PermissionService",
  function($scope, $http, $location, LoginService, MailService, InfoService,
  PermissionService) {

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
  let mailer = this;
  /**
   * @param {object} info Contains the message to send to the admin.
   */
  mailer.submitForm = function(info) {
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

  //PERMISSION FUNCTIONALITY
  $scope.newGroup = {};
  $scope.inviteCollaborators = function(collaborators) {
    findCollaborators(collaborators);
    sendConfirmation();
  };

  findCollaborators = function(orgsArray) {
    $http.get("/organizations/array", orgsArray).then(function(response) {
      
    });
  };

  sendConfirmation = function() {
    let newInviteObj  = PermissionService.createInvite(),
        newInviteCode = newInviteObj.code,
        mailObject    = {
          toEmail: email,
          subject: "Confirm Collaboration",
          message: "Please click the link to confirm collaboration: <a href='" +
            $scope.baseURL + "/#/activate/" + newInviteCode + "'>Register</a>."
        };
    MailService.sendEmail(mailObject);
  };

  $scope.groups = PermissionService.groups;
  PermissionService.getGroups();
  $scope.baseURL = $location.$$protocol + '://' + $location.$$host + ':' + $location.$$port;

}]);
