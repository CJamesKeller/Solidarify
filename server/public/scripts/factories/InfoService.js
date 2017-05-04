/**
* @fileoverview Functionality for pages handling Event & Organization data.
* @author Christopher Keller
*/

myApp.factory("InfoService", ["$http", "$location", function($http, $location) {

//ORGANIZATIONS
/**
* @param {object} newOrgObj An object containing the new organization info.
*/
newOrg = function(newOrgObj) {
  $http.post("/organizations", newOrgObj).then(function(response) {
      $location.path("/home"); //??? ??? ???
  });
};

let allOrgs = {
  orgArray: []
};
/**
* @returns {object} Contains an array of organization objects.
*/
getOrgs = function() {
  $http.get("/organizations").then(function(response) {
    allOrgs.orgArray = response.data;
    return allOrgs;
  });
};
/**
* @param {string} orgID Used to find and edit organization info.
*/
editOrg = function(orgID) { //THIS STILL NEEDS TO BE FIXED
  let id = orgID;
  $http.put("/organizations/" + id).then(function(response) {
    $location.path("/admin"); //??? ??? ???
  });
};

/**
* @param {string} orgID Used to find and delete an organization.
*/
deleteOrg = function(orgID) {
  let id = orgID;
  $http.delete("/organizations/" + id).then(function(response) {
    $location.path("/admin"); //??? ??? ???
  });
};

//EVENTS
/**
* @param {object} newEventObj An object containing the new event info.
* @returns {object} The new event.
*/
createEvent = function(newEventObj) {
  return $http.post("/events", newEventObj).then(function(response) {
      return response;
  });
};

let allEvents = {
  eventArray: []
};
/**
* @returns {object} Contains an array of event objects.
*/
getEvents = function() {
  $http.get("/events").then(function(response) {
    allEvents.eventArray = response.data;
    return allEvents;
  });
};

/**
* @param {string} eventID Used to find and edit event info.
*/
editEvent = function(eventID) { //THIS STILL NEEDS TO BE FIXED
  let id = eventID;
  $http.put("/events/" + id).then(function(response) {
    $location.path("/admin"); //??? ??? ???
  });
};

/**
 * @param {string} eventID Used to find the event.
 * @param {string} eventCode Used to update the event info.
 */
finishEvent = function(eventID, eventCode) { //THIS STILL NEEDS TO BE FIXED
  let id = eventID,
      code = eventCode;
  $http.put("/events/finish/" + id, {"code": code}).then(function(response) {
    $location.path("/org");
  });
};

/**
* @param {string} eventID Used to find and delete an event.
*/
deleteEvent = function(eventID) {
  let id = eventID;
  $http.delete("/events/" + id).then(function(response) {
    $location.path("/admin"); //??? ??? ???
  });
};

  return {
    newOrg : newOrg,
    createEvent : createEvent,
    getOrgs : getOrgs,
    allOrgs : allOrgs,
    allEvents : allEvents,
    getEvents : getEvents,
    editOrg : editOrg,
    editEvent : editEvent,
    deleteOrg : deleteOrg,
    finishEvent : finishEvent,
    deleteEvent : deleteEvent
  };

}]);
