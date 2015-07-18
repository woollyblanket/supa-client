(function() {
	'use strict';

	angular.module('supa')
	.controller('ResultsCtrl', ResultsCtrl);

	/** @ngInject */
	function ResultsCtrl($scope, ShoppingList, $log, filterWithOrFilter, filterFilter) {
		$scope.results = [];
		$scope.filteredResults = [];
		$scope.stores = [];
		$scope.storeFilter = [];
		$scope.keywords = [];
		$scope.keywordFilter = [];
		$scope.categories = [];
		$scope.categoryFilter = [];
		$scope.showActive = 1;

		$scope.radioModel = 'Active';

		$scope.listResults = ShoppingList.getResults()
		.then(function(data){
			$scope.results = data.data;
			$scope.filteredResults = $scope.results.slice();
			$scope.stores = ShoppingList.getStores();
			$scope.storeFilter = $scope.stores.slice();
			$scope.keywords = ShoppingList.getKeywords();
			$scope.keywordFilter = $scope.keywords.slice();
			$scope.categories = ShoppingList.getCategories();
			$scope.categoryFilter = ShoppingList.getCatIDs();

			ShoppingList.updateCatCount($scope.filteredResults, $scope.categories, 1);
		})
		.catch(function(data, status) {
		    $log.error('ShoppingList getResults error', status, data);
		});

		var filterResults = function(){
			// Make sure everything is in the filteredResults array before filtering
			$scope.filteredResults = $scope.results.slice();

			$scope.filteredResults = filterFilter($scope.filteredResults, {active:$scope.showActive} );
			$scope.filteredResults = filterWithOrFilter($scope.filteredResults, {
				store:$scope.storeFilter,
				keyword:$scope.keywordFilter,
				leafID:$scope.categoryFilter.leafIDs,
				childID:$scope.categoryFilter.childIDs,
				parentID:$scope.categoryFilter.parentIDs
			});

			// Update the cateogry tree counts
			ShoppingList.updateCatCount($scope.filteredResults, $scope.categories, 1);
		};


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

			filterResults();
		};

		$scope.setActiveItems = function(aBool){
			// for showing the active items in the list
			if(aBool === false){
				$scope.showActive = 0;
			}
			else if(aBool === true){
				$scope.showActive = 1;
			}

			filterResults();
		};

		$scope.total = function() {

			var total = 0;
			for (var i = 0, len = $scope.filteredResults.length; i < len; i++) {
			  	var item = $scope.filteredResults[i];
			  	total += item.price * item.qty;
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

			filterResults();
		};

		$scope.addAllStores = function(){
			$scope.storeFilter = $scope.stores.slice();
			filterResults();
		};

		$scope.clearAllStores = function(){
			$scope.storeFilter.length = 0;
			filterResults();
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
	}
})();
