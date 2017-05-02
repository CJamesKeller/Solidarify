/**
* @fileoverview Functionality for pages handling Event & Organization data.
* @author Christopher Keller
*/

myApp.factory("InfoService", ["$http", function($http) {

//ORGANIZATIONS
newOrg = function(newOrgObj) {
  $http.post("/organizations", newOrgObj).then(function(response) {
      $location.path("/home"); //??? ??? ???
  });
};

let allOrgs = {
  orgArray: []
};
getOrgs = function() {
  $http.get("/organizations").then(function(response) {
    allOrgs.orgArray = response.data;
    return allOrgs;
  });
};

editOrg = function(orgID) { //THIS STILL NEEDS TO BE FIXED
  let id = orgID;
  $http.put("/organizations/" + id).then(function(response) {
    $location.path("/admin"); //??? ??? ???
  });
};

deleteOrg = function(orgID) {
  let id = orgID;
  $http.delete("/organizations/" + id).then(function(response) {
    $location.path("/admin"); //??? ??? ???
  });
};

//EVENTS
newEvent = function(newEventObj) {
  $http.post("/events", newEventObj).then(function(response) {
      $location.path("/home"); //??? ??? ???
  });
};

let allEvents = {
  eventArray: []
};
getEvents = function() {
  $http.get("/events").then(function(response) {
    allEvents.eventArray = response.data;
    return allEvents;
  });
};

editEvent = function(eventID) { //THIS STILL NEEDS TO BE FIXED
  let id = eventID;
  $http.put("/events/" + id).then(function(response) {
    $location.path("/admin"); //??? ??? ???
  });
};

deleteEvent = function(eventID) {
  let id = eventID;
  $http.delete("/events/" + id).then(function(response) {
    $location.path("/admin"); //??? ??? ???
  });
};

  return {
    newOrg : newOrg,
    newEvent : newEvent,
    getOrgs : getOrgs,
    allOrgs : allOrgs,
    allEvents : allEvents,
    getEvents : getEvents,
    editOrg : editOrg,
    editEvent : editEvent,
    deleteOrg : deleteOrg,
    deleteEvent : deleteEvent
  };

}]);
