/**
* @fileoverview Functionality for pages handling Request data.
* @author Christopher Keller
*/

myApp.factory("RequestService", ["$http", "$location", function($http, $location){

/**
* @param {object} newReqObj The complete info submitted via form on home page.
*/
newRequest = function(newReqObj){
  $http.post("/requests", newReqObj).then(function(response){
      $location.path("/home");
  });
};

var allReqs = {
  reqArray: []
};

/**
* @returns {object} allReqs containing array of all current Requests.
*/
getReqs = function(){
  $http.get("/requests").then(function(response){
    allReqs.reqArray = response.data;
    return allReqs;
  });
};

deleteReq = function(reqID){
  var id = reqID;
  $http.delete("/requests/" + id).then(function(response){
    $location.path("/admin");
  });
};

  return{
    newRequest: newRequest,
    getReqs:    getReqs,
    allReqs:    allReqs,
    deleteReq:  deleteReq
  };

}]);
