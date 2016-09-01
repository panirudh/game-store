var myApp = angular.module('myApp');

myApp.controller('GamesController', ['$scope', '$http', '$location', '$routeParams', '$rootScope', '$mdToast', function($scope, $http, $location, $routeParams, $rootScope, $mdToast){
    console.log("Games Controller Loaded");
	var searchMin = 4;
	$scope.currentUser = $rootScope.currentUser;
	$scope.searchTextModel = '';
	$scope.showCategory = false;
	$scope.searchGames = false;
	
	$scope.showSimpleToast = function() {
    $mdToast.show(
      $mdToast.simple()
        .textContent('Added to your Wish List')
        .position("bottom right")
        .hideDelay(3000)
    );
    }
	
    $scope.getGames = function(){
        $http.get('/api/games').success(function(response){
            $scope.games = response;
			$scope.searchGames = false;
        });
    }
	
	
	$scope.getGame = function(){
		var id=$routeParams.id;
        $http.get('/api/games/'+id).success(function(response){
            $scope.game = response;
        });
    }
	
	$scope.getGameByCategory = function(category){
		
        $http.get('/api/cat/'+category).success(function(response){
            $scope.cats = response;
        });
		$scope.showCategory = true;
    }
	
	$scope.searchGameByText = function(keywords){
        $http.get('/api/searchgames/'+keywords).success(function(response){
            $scope.searchresults = response;
        });
		$scope.searchGames = true; 
    }
	
	$scope.searchText = function(){
		if ($scope.searchTextModel.length >= searchMin) $scope.searchGameByText($scope.searchTextModel);
		else $scope.getGames();
        
    };

	
	$scope.addGame = function(){
        $http.post('/api/games', $scope.game).success(function(response){
            window.location.href='#/games';
        });
    }
	
	$scope.updateGame = function(){
		var id=$routeParams.id;
        $http.put('/api/games/'+id, $scope.game).success(function(response){
            window.location.href='#/games';
        });
    }
	
	$scope.removeGame = function(){
		var id=$routeParams.id;
        $http.delete('/api/games/'+id).success(function(response){
            window.location.href='#/games';
        });
    }
	
	
	
	$scope.getGenres = function(){
        $http.get('/api/genres').success(function(response){
            $scope.genres = response;
        });
    }
	
	
	$scope.updateWishList = function(game){
		var id=$rootScope.currentUser._id;
        $http.put('/api/wishlist/'+id, game).success(function(response){
			$scope.showSimpleToast();
        });
    }


}]);