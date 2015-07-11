'use strict';

/**
* @ngdoc function
* @name clientApp.controller:ResultsCtrl
* @description
* # ResultsCtrl
* Controller of the clientApp
*/
angular.module('clientApp')
.controller('ResultsCtrl', function ($scope, ShoppingList, $log) {
	$scope.results = [];
	$scope.stores = [];
	$scope.storeFilter = [];
	$scope.showActive = 1;

	$scope.radioModel = 'Active';

	$scope.listResults = ShoppingList.getResults()
	.then(function(data){
		$scope.results = data.data;
		$scope.stores = ShoppingList.getStores();
		$scope.storeFilter = angular.copy($scope.stores);
	})
	.catch(function(data, status) {
	    $log.error('ShoppingList getResults error', status, data);
	});

	$scope.toggleActiveItem = function(anID){
		// for making individual items active or inactive

		for (var i = 0, len = $scope.results.length; i < len; i++) {
		  	var item = $scope.results[i];
			if(item.id === anID){
				if(item.active === 1){
					item.active = 0;
				}
				else{
					item.active = 1;
				}
			}
		}
	};

	$scope.setActiveItems = function(aBool){
		// for showing the active items in the list
		if(aBool === false){
			$scope.showActive = 0;
		}
		else if(aBool === true){
			$scope.showActive = 1;
		}
	};

	$scope.total = function() {
		// filterWithOr:{product:storeFilter} | filter:{active:showActive}

		var total = 0;
		for (var i = 0, len = $scope.results.length; i < len; i++) {
		  	var item = $scope.results[i];
			// grabs all the results. We only want to grab the results, taking into account the filter
			// Also match the active state
			if($scope.storeFilter.indexOf(item.product) !== -1 && item.active === $scope.showActive){
				total += item.price * item.qty;
			}
		}

		return total;
	};

	$scope.toggleActiveStore = function(store){
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

	$scope.addAllStores = function(){
		$scope.storeFilter = angular.copy($scope.stores);
	};

	$scope.clearAllStores = function(){
		$scope.storeFilter.length = 0;
	};

	$scope.quantityPlus = function(itemID){
		for (var i = 0, len = $scope.results.length; i < len; i++) {
		  	var item = $scope.results[i];
			if(item.id === itemID){
				item.qty++;
			}
		}
	};

	$scope.quantityMinus = function(itemID){
		for (var i = 0, len = $scope.results.length; i < len; i++) {
		  	var item = $scope.results[i];
			if(item.id === itemID && item.qty > 0){
				item.qty--;
			}
		}
	};
});
