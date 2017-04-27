myApp.factory("AdminService", [function(){

newReqArray = [];
newRequest = function(newReqObj){
  newReqArray.push(newReqObj);
};

  return{
    newRequest: newRequest,
    newReqArray: newReqArray
  };
}]);
