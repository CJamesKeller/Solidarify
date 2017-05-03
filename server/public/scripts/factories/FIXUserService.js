myApp.factory('UserService', ['$http', '$location', '$route', function($http, $location, $route){
  console.log('User Service Loaded');
  var code = {};
  var userObject = {};
  var groups = {};

  var getGroups = function(){
    $http.get('/group/').then(function(response) {
      groups.data = response.data;
    });
  };

  var joinGroup = function(groupId){
    $http.put('/group/join/' + groupId ).then(function(response) {
      console.log(response);
      code.tempCode = undefined;
      $location.path("/user");
    });
  };

  var createGroup = function(groupName){
    $http.post('/group/create', {name: groupName}).then(function(response) {
      console.log(response);
      getGroups();
    });
  };

  var getUser = function(){
    $http.get('/user').then(function(response) {
        if(response.data.username) {
            // user has a curret session on the server
            userObject.userName = response.data.username;
            userObject.id = response.data._id;
            console.log('User Data: ', userObject.userName);
        } else {
            // Store the activation code for later use
            code.tempCode = $route.current.params.code;
            console.log('Activation code: ', $route.current.params.code);

            // user has no session, bounce them back to the login page
            $location.path("/home");
        }
    });
  };

  var logout = function() {
      $http.get('/user/logout').then(function(response) {
        console.log('logged out');
        userObject.name = '';
        userObject.id = '';
        UserService.code.tempCode = undefined;
        $location.path("/home");
      });
  };

  return {
    userObject : userObject,
    code: code,
    groups: groups,
    // Functions
    getuser : getUser,
    logout : logout,
    createGroup : createGroup,
    joinGroup : joinGroup,
    getGroups : getGroups
  };
}]);
