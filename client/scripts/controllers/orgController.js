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
  $scope.makeAndSend = function(newEvent, collaborators) {
    newEvent.orgs = collaborators;
    InfoService.createEvent(newEvent)
    .then(function(createdEvent) {
      let newEventID = createdEvent.data._id;
      if ( collaborators ) {
        findCollaborators(collaborators)
        .then(function(eventCode){
          InfoService.finishEvent(newEventID, eventCode);
        });
      }
    });
    getMyEvents();
  };

  /**
   * @param {array} orgsArray Contains all selected collaborator orgs ID's.
   * @returns {array} Contains all selected collaborator organizations' info.
   */
  findCollaborators = function(orgsArray) {
    let numOrgs = 0,
        collabPromiseArray,
        thisEventCode;
    numOrgs = orgsArray.length;
    for (i = 0; i < numOrgs; i++) {
      $http.get("/organizations/array", orgsArray[i])
      .then(function(response) {
        collabPromiseArray.push(sendConfirmation(response));
      });
    }
    return Promise.all(collabPromiseArray)
    .then(function(thisEventCode){
      return thisEventCode;
    });
  };

  /**
   * @param {array} collaborators Contains all selected collaborator org info.
   * @returns {string} The event-specific invitation code.
   */
  sendConfirmation = function(collaborators) {
    let mailPromiseArray,
        newInviteObj  = PermissionService.createInvite(),
        newInviteCode = newInviteObj.code,
        numOrgs = collaborators.length;
    for (i = 0; i < numOrgs; i++) {
      let email = collaborators[i].email,
          mailObject = {
        toEmail: email,
        subject: "Confirm Collaboration",
        message: "Please click the link to confirm collaboration: <a href='" +
          $scope.baseURL + "/#/collaborate/" + newInviteCode + "'>Register</a>."
      };
      mailPromiseArray.push(MailService.sendEmail(mailObject));
    }
    return Promise.all(mailPromiseArray)
    .then(function(){
      return newInviteCode;
    });
  };

  $scope.groups = PermissionService.groups;
  PermissionService.getGroups();
  $scope.baseURL = $location.$$protocol + '://' + $location.$$host + ':' + $location.$$port;

}]);