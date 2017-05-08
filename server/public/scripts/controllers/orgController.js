myApp.controller("OrgController",
  ["$scope", "$http", "$location", "LoginService", "MailService", "InfoService",
  "PermissionService",
  function($scope, $http, $location, LoginService, MailService, InfoService,
  PermissionService) {

  //INFO FUNCTIONALITY
    //ORGANIZATIONS
  InfoService.getOrgs();
  $scope.newOrg = InfoService.newOrg;
  $scope.allOrgs = InfoService.allOrgs;
  $scope.editOrg = InfoService.editOrg;
  $scope.deleteOrg = InfoService.deleteOrg;
  $scope.collabs = {
    orgsArray: []
  };
    //EVENTS
  $scope.allEvents = InfoService.allEvents;
  $scope.editEvent = InfoService.editEvent;
  $scope.deleteEvent = function(id) {
    InfoService.deleteEvent(id)
    .then(function(response) {
      getMyEvents();
    });
  };
  $scope.myEvents = {
    eventsArray: []
  };

  getMyEvents = function() {
    LoginService.getuser()
    .then(function(response) {
      thisUser = LoginService.userObject;
      if ( thisUser.id ) {
        let orgID = thisUser.id;
        $http.get("/events/my-events/" + orgID).then(function(response) {
          $scope.myEvents.eventsArray = response.data;
        });
      }
    });
  };
  getMyEvents();

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
  $scope.makeAndSend = function(newEvent) {
    InfoService.createEvent(newEvent)
    .then(function(createdEvent) {
      if ( newEvent.orgs ) {
        let newEventID,
            newInviteCode;
        newEventID = createdEvent.data._id;
        PermissionService.createInvite()
        .then(function(newInviteObj) {
          newInviteCode = newInviteObj.data.code;
          InfoService.finishEvent(newEventID, newInviteCode);
          findCollaborators(newEvent.orgs, newInviteCode);
        });
      }
    });
    getMyEvents();
  };

  /**
   * @param {array} orgsArray Contains all selected collaborator orgs ID's.
   * @returns {array} Contains all selected collaborator organizations' info.
   */
  findCollaborators = function(orgsArray, newInviteCode) {
    console.log("the code: ", newInviteCode);
    let numOrgs = 0;
    numOrgs = orgsArray.length;
    for (i = 0; i < numOrgs; i++) {
      $http.get("/organizations/collab/" + orgsArray[i])
      .then(function(response) {
        sendConfirmation(response, newInviteCode);
      });
    }
  };

  /**
   * @param {array} collaborators Contains all selected collaborator org info.
   * @returns {string} The event-specific invitation code.
   */
  sendConfirmation = function(collaborator, InviteCode) {
    let mailPromiseArray,
        mailObject;
    mailObject = {
        toEmail: collaborator.data.email,
        subject: "Confirm Collaboration",
        message: "Please click the link to confirm collaboration: <a href='" +
          $scope.baseURL + "/#/collaborate/" + InviteCode + "/" +
          collaborator.data.userID + "'>Register</a>."
    };
    MailService.sendEmail(mailObject);
  };

  $scope.groups = PermissionService.groups;
  PermissionService.getGroups();
  $scope.baseURL = $location.$$protocol + '://' + $location.$$host + ':' + $location.$$port;

}]);
