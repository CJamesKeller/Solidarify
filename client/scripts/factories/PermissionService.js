myApp.factory('PermissionService',
  ['$http', '$location', '$route', function($http, $location, $route) {

  let canRegister = false,
      code        = {},
      groups      = {},
      userObject  = {};

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
      canRegister = true;
      $location.path("/register");
    });
  };

  /**
   * @param {object} user The organization confirming collaboration.
   * @param {string} permissionCode The verification of permission.
   */
  collaborate = function(code) {
    $http.put('/permission/collaborate/' + code )
    .then(function(response) {
      code.tempCode = undefined;
      return response;
    });
  };

  /**
   * @returns {object} The new invitation.
   */
  createInvite = function() {
    return $http.post('/permission/create').then(function(response) {
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
    canRegister: canRegister,
    code: code,
    groups: groups,
    userObject : userObject,
    // Functions
    createInvite : createInvite,
    getGroups : getGroups,
    getuser : getUser,
    joinGroup : joinGroup,
    logout : logout
  };
}]);
