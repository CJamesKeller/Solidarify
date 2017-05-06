myApp.factory("MailService", ["$http", "$location", function($http, $location) {
  return {
    /**
     * @param {object} info Contains the email address and message to send.
     */
    sendEmail: function(info) {
      $http.post("/mail", info).then(function(response) {
        alert("Email successfully sent!");
      });
    }
  };
}]);
