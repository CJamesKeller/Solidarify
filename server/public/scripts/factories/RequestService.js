myApp.factory("RequestService", ["$http", "$location", function($http, $location){

newRequest = function(newReqObj){
  $http.post("/requests", newReqObj).then(function(response){
      $location.path("/home");
  });
};

var allReqs = {
  reqArray: []
};

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
