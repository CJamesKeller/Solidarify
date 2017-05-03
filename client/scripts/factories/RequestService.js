/**
* @fileoverview Functionality for pages handling Request data.
* @author Christopher Keller
*/

myApp.factory("RequestService", ["$http", "$location", function($http, $location) {

/**
* @param {object} newReqObj The request submitted via form on home page.
*/
newRequest = function(newReqObj) {
  $http.post("/requests", newReqObj).then(function(response) {
      $location.path("/home");
  });
};

let allReqs = {
  reqArray: []
};
/**
 * @returns {object} Contains an array of all current requests.
 */
getReqs = function() {
  $http.get("/requests").then(function(response) {
    allReqs.reqArray = response.data;
    return allReqs;
  });
};

/**
 * @param {string} reqID Used to find and delete requests.
 */
deleteReq = function(reqID) {
  let id = reqID;
  $http.delete("/requests/" + id).then(function(response) {
    $location.path("/admin");
  });
};

  return {
    newRequest: newRequest,
    getReqs:    getReqs,
    allReqs:    allReqs,
    deleteReq:  deleteReq
  };

}]);
