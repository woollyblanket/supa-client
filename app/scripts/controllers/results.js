'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ResultsCtrl
 * @description
 * # ResultsCtrl
 * Controller of the clientApp
 */
 angular.module('clientApp')
 .controller('ResultsCtrl', function ($scope, ShoppingList) {
 	$scope.results = [];

 	// will need to do on ng-click when we have the search results
 	var listResults = function(){
 		return ShoppingList.results()
 		.then(function(data){
 			$scope.results = data.data;
 		});
 	};

 	listResults();

 	$scope.removeItem = function(index) {
		console.log($scope.results);
	    $scope.results.splice(index, 1);
	};

    $scope.total = function() {
        var total = 0;
        angular.forEach($scope.results, function(item) {
            total += item.price * item.qty;
        });

        return total;
    };
 });
