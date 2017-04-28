myApp.factory("InfoService", ["$http", function($http){

//ORGANIZATIONS
  $http.get("/organizations").then(function(response) {

    $location.path("/home");
  });

  $http.post("/organizations", whatPosted).then(function(response) {

      $location.path("/newRoute");
  });

//EVENTS
  $http.get("/events").then(function(response) {

    $location.path("/home");
  });

  $http.post("/events", whatPosted).then(function(response) {

      $location.path("/newRoute");
  });

}]);
