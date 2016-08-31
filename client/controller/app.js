var app = angular.module("myApp", ["ngRoute"]);

app.config(function($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: 'views/home.html'
    })
    .when('/users', {
      templateUrl: 'views/users.html',
      controller: 'UsersController'
    })
	.when('/wishlist', {
      templateUrl: 'views/wishlist.html',
      controller: 'UsersController'
    })
    .when('/userdetails/:id', {
      templateUrl: 'views/userdetails.html',
      controller: 'UsersController'
    })
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl'
    })
    .when('/signup', {
      templateUrl: 'views/signup.html',
      controller: 'SignUpCtrl'
    })
    .when('/profile', {
      templateUrl: 'views/profile.html',
      resolve: {
        logincheck: checkLoggedin
      }
    })
    .when('/', {
        controller:'GamesController',
        templateUrl:'views/games.html'
    })
    .when('/games',{
        controller:'GamesController',
        templateUrl:'views/games.html'
    })
    .when('/games/details/:id', {
        controller:'GamesController',
        templateUrl:'views/game_details.html'
    })
    .when('/games/add', {
        controller:'GamesController',
        templateUrl:'views/add_game.html'
    })
    .when('/games/edit/:id', {
        controller:'GamesController',
        templateUrl:'views/edit_game.html'
    })
    .when('/genre/add', {
        controller:'GenreController',
        templateUrl:'views/add_genre.html'
    })
    .otherwise({
      redirectTo: '/home'
    })
	
});

var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
  var deferred = $q.defer();

  $http.get('/loggedin').success(function(user) {
    $rootScope.errorMessage = null;
    //User is Authenticated
    if (user !== '0') {
      $rootScope.currentUser = user;
      deferred.resolve();
    } else { //User is not Authenticated
      $rootScope.errorMessage = 'You need to log in.';
      deferred.reject();
      $location.url('/login');
    }
  });
  return deferred.promise;
}