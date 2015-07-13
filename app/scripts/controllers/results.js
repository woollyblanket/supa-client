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
	$scope.keywords = [];
	$scope.keywordFilter = [];
	$scope.showActive = 1;

	$scope.radioModel = 'Active';

	$scope.listResults = ShoppingList.getResults()
	.then(function(data){
		$scope.results = data.data;
		$scope.stores = ShoppingList.getStores();
		$scope.storeFilter = angular.copy($scope.stores);
		$scope.keywords = ShoppingList.getKeywords();
		$scope.keywordFilter = angular.copy($scope.keywords);
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
			if($scope.storeFilter.indexOf(item.store) !== -1 && $scope.keywordFilter.indexOf(item.keyword) !== -1 && item.active === $scope.showActive){
				total += item.price * item.qty;
			}
		}

		return total;
	};

	$scope.toggleItemInArray = function(item, array){
		// checks if item is already in the array,
		// if it is, remove it
		// if it isn't, add it
		var index = array.indexOf(item);

		if(index !== -1){
			// item exists, take it away
			array.splice(index, 1);
		}
		else{
			// item doesn't exist, add it
			array.push(item);
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
