myApp.factory("RequestService", [function(){

newReqArray = [];
newRequest = function(newReqObj){
  newReqArray.push(newReqObj);
  console.log(newReqArray);
};

  return{
    newRequest: newRequest,
    newReqArray: newReqArray
  };
}]);
