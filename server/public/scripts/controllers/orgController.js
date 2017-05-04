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
    //EVENTS
  InfoService.getEvents();
  $scope.createEvent = InfoService.createEvent;
  $scope.allEvents = InfoService.allEvents;
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
  $scope.makeAndSend = function(newEvent, collaborators) {
    InfoService.createEvent(newEvent).then(function(createdEvent) {
      let eventCode = findCollaborators(collaborators);
      let newEventID = createdEvent.data._id;
      InfoService.finishEvent(newEventID, eventCode);
    });
  };

  /**
   * @param {array} orgsArray Contains all selected collaborator orgs ID's.
   * @returns {array} Contains all selected collaborator organizations' info.
   */
  findCollaborators = function(orgsArray) {
    let collaboratorArray = [],
        numOrgs = 0,
        thisEventCode;
    if ( orgsArray ) {
      numOrgs = orgsArray.length;
      for (i = 0; i < numOrgs; i++) {
        $http.get("/organizations/array", orgsArray[i]).then(function(response) {
          collaboratorArray.push(response);
        });
      }
    }
    thisEventCode = sendConfirmation(collaboratorArray);
    return thisEventCode;
  };

  /**
   * @param {array} collaborators Contains all selected collaborator org info.
   * @returns {string} The event-specific invitation code.
   */
  sendConfirmation = function(collaborators) {
    let newInviteObj  = PermissionService.createInvite(),
        newInviteCode = newInviteObj.code,
        numOrgs = collaborators.length
        for (i = 0; i < numOrgs; i++) {
          let email = collaborators[i].email,
              mailObject = {
            toEmail: email,
            subject: "Confirm Collaboration",
            message: "Please click the link to confirm collaboration: <a href='" +
              $scope.baseURL + "/#/collaborate/" + newInviteCode + "'>Register</a>."
          };
          MailService.sendEmail(mailObject);
        }
        return newInviteCode;
  };

  $scope.groups = PermissionService.groups;
  PermissionService.getGroups();
  $scope.baseURL = $location.$$protocol + '://' + $location.$$host + ':' + $location.$$port;

}]);
