var myApp = angular.module('myApp');

myApp.controller('UsersController', ['$scope', '$http', '$location', '$routeParams', '$rootScope', function($scope, $http, $location, $routeParams, $rootScope){
    console.log("Users Controller Loaded");

    $scope.getUsers = function(){
        $http.get('/api/users').success(function(response){
            $scope.users = response;
            
        });
    }
	    
	$scope.getUser = function(){
		var id=$routeParams.id;
        $http.get('/api/user/'+id).success(function(response){
        console.log(response);
            $scope.user = response;
            
        });
    }
	
	$scope.getcurrentUser = function(){
			var id=$rootScope.currentUser._id;
			$http.get('/api/user/'+id).success(function(response){
			console.log(response);
            $scope.user = response;
            
        });
            
    }
	
	$scope.updateWishList = function(){
		var id=$routeParams.id;
        $http.put('/api/wishlist/'+id, $scope.game).success(function(response){
            window.location.href='#/games';
        });
    }

}]);