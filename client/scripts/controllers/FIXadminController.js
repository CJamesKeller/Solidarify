myApp.controller("AdminController",
  ["$scope", "$http", "$location", "LoginService", "RequestService",
  "MailService", "InfoService", "UserService",
  function($scope, $http, $location, LoginService,
  RequestService, MailService, InfoService, UserService) {

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

  $scope.newGroup = {};
  $scope.createGroup = UserService.createGroup;
  $scope.groups = UserService.groups;
  UserService.getGroups();
  $scope.baseURL = $location.$$protocol + '://' + $location.$$host + ':' + $location.$$port;

}]);
