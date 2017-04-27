$http.get('/route').then(function(response) {

  $location.path("/home");
});

$http.post('/routeIfAny', whatPosted).then(function(response) {

    $location.path('/newRoute');
});


$http.get('/route').then(function(response) {

  $location.path("/home");
});

$http.post('/routeIfAny', whatPosted).then(function(response) {

    $location.path('/newRoute');
});
