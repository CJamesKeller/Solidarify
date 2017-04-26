myApp.factory('MailService', ['$http', function($http){
  return {
    sendEmail: function(info){
      $http.post('/mail', info).then(function(response){
        console.log("Email has been sent: ", response.data);
      });
    }
  };
}]);
