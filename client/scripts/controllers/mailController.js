myApp.controller('MailController', ['MailService', function(MailService){
    var mailer = this;

    mailer.submitForm = function(info){
        MailService.sendEmail(info);
    };
}]);
