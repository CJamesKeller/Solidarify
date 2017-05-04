myApp.factory('UserService',
  ['$http', '$location', '$route', function($http, $location, $route) {

  let code        = {},
      userObject  = {},
      groups      = {};

  getGroups = function(){
    $http.get('/permission/').then(function(response) {
      groups.data = response.data;
    });
  };

  /**
   * @param {string} permissionCode The verification of permission.
   */
  joinGroup = function(permissionCode) {
    $http.put('/permission/join/' + permissionCode ).then(function(response) {
      code.tempCode = undefined;
      $location.path("/org");
    });
  };

  /**
   * @returns {object} The new invitation.
   */
  createInvite = function() {
    $http.post('/permission/create').then(function(response) {
      getGroups();
      return response;
    });
  };

  getUser = function() {
    $http.get('/user').then(function(response) {
        if(response.data.username) {
            // user has a curret session on the server
            userObject.userName = response.data.username;
            userObject.id = response.data._id;
            console.log('User Data: ', userObject.userName);
        }
        else {
            // Store the activation code for later use
            code.tempCode = $route.current.params.code;
            console.log('Activation code: ', $route.current.params.code);

            // user has no session, bounce them back to the login page
            $location.path("/home");
        }
    });
  };

  logout = function() {
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
    createInvite : createInvite,
    createEvent : createEvent,
    joinGroup : joinGroup,
    getGroups : getGroups
  };
}]);