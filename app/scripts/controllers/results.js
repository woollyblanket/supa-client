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
	$scope.stores = [];
	$scope.storeFilter = [];

	// will need to do on ng-click when we have the search results
	var listResults = function(){
		return ShoppingList.results()
		.then(function(data){
			$scope.results = data.data;
		});
	};

	// Get the stores from the results array
	var getStores = function(){
		angular.forEach($scope.results, function(item) {
			if ($scope.stores.indexOf(item.product) === -1) {
				$scope.stores.push(item.product);
		        // alphabetise the list
		        $scope.stores.sort();

		        $scope.storeFilter = angular.copy($scope.stores);
		    }
		});
	};

	// When the results array changes, update the stores list
	$scope.$watchCollection('results', function() {
		getStores();
	});

	listResults();

	$scope.removeItem = function(index) {
		// Clearing out the stores array so that it keeps synched with what's in
		// the results array (otherwise calling removeItem wont remove the store too)
		$scope.stores.length = 0;

		$scope.results.splice(index, 1);
	};

	$scope.total = function() {
		var total = 0;
		angular.forEach($scope.results, function(item) {
			// grabs all the results. We only want to grab the results, taking into account the filter
			if($scope.storeFilter.indexOf(item.product) !== -1){
				total += item.price * item.qty;
			}
		});

		return total;
	};

	$scope.toggleStore = function(store){
		// if the store is in the filters list then it will be included
		// if it's not in the list, then it will be excluded
		// add it if it's not there
		// take it away if it is

		var index = $scope.storeFilter.indexOf(store);

		if(index !== -1){
			// store exists, take it away
			$scope.storeFilter.splice(index, 1);
		}
		else{
			// store doesn't exist, add it
			$scope.storeFilter.push(store);
		}
	};

	$scope.addAllStoresToFilter = function(){
		$scope.storeFilter = angular.copy($scope.stores);
	};

	$scope.clearAllStoresFromFilter = function(){
		$scope.storeFilter.length = 0;
	};
});
