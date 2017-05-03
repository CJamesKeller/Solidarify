myApp.factory("MailService", ["$http", function($http) {
  return {
    /**
     * @param {object} info Contains the email address and message to send.
     */
    sendEmail: function(info) {
      $http.post("/mail", info).then(function(response) {
        console.log("Email has been sent: ", response.data);
      });
    }
  };
}]);
