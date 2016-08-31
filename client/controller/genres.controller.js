var myApp = angular.module('myApp');

myApp.controller('GenreController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
    console.log("Genres Controller Loaded");
    $scope.addCategory = function(){
            $http.post('/api/genres', $scope.genre).success(function(response){
                console.log(response);
                window.location.href='#/games';
            });
        }
}]);        