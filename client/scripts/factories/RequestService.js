myApp.factory("RequestService", [function(){

newReqArray = [];
newRequest = function(newReqObj){
  newReqArray.push(newReqObj);
  console.log(newReqArray);
};

$http.get('/route').then(function(response) {

  $location.path("/home");
});

$http.post('/routeIfAny', whatPosted).then(function(response) {
  
    $location.path('/newRoute');
});

  return{
    newRequest: newRequest,
    newReqArray: newReqArray
  };
}]);
