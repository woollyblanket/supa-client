(function() {
	'use strict';

	angular.module('supa')
	.controller('ResultsCtrl', ResultsCtrl);

	/** @ngInject */
	function ResultsCtrl($scope, ShoppingList, $log, filterWithOrFilter, filterFilter, lodash) {
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
			// $scope.categoryFilter = ShoppingList.getCatIDs();
			//$scope.categoryFilter = ShoppingList.getCatIDs1();
			 $scope.categoryFilter = $scope.categories.slice();

			//ShoppingList.updateCatCount($scope.filteredResults, $scope.categories, 1);
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
				categoryID: $scope.categoryFilter
				// parentID:$scope.categoryFilter.parentIDs.ids//,
				// childID:$scope.categoryFilter.childIDs,
				// leafID:$scope.categoryFilter.leafIDs
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

		$scope.toggleCategoryFilter = function(item, depth){

			// parent: depth = 0
			// child: depth = 1
			// leaf: depth = 2

			switch (depth){
				case 0:
					// parent

					// remove id from the ids array

					// $log.debug('$scope.categoryFilter.parentIDs.ids', $scope.categoryFilter.parentIDs.ids);
					var index0 = $scope.categoryFilter.parentIDs.ids.indexOf(item.id);

					if(index0 !== -1){
			        	// item is in the filter - remove it
			        	$scope.categoryFilter.parentIDs.ids.splice (index0, 1);
			        }
			        else{
			        	// item isn't in the filter - add it
			        	$scope.categoryFilter.parentIDs.ids.push(item.id);
			        }

			        // Make sure everything is in the filteredResults array before filtering
			        //$scope.filteredResults = $scope.results.slice();

			        // filter the results based on what's in the category filter
			        $scope.filteredResults = filterWithOrFilter($scope.filteredResults, {
			        	parentID:$scope.categoryFilter.parentIDs.ids
					});

					// Update the cateogry tree counts
					//ShoppingList.updateCatCount($scope.filteredResults, $scope.categories, 1);

					break;

				case 1:
					// child
					break;

				case 2:
					// leaf
					break;

				default:
					$log.warning('depth must be 0, 1 or 2. Depth specified: ' + depth);
			}

			// /*

			// Single dimention arrays, one array for each depth
			// Not working for leaf nodes with the same name
			// Not working when a parent is turned off and then a child is turned on

			// */

			// // I'm passing in the item to be removed and added to the categoryFilter
			// // if the item is already in the filter, remove it
			// // if the item isn't in the filter, add it

			// switch (depth) {
			//     case 0:
			//     	// parent
			//         $log.debug('depth', depth);

			//         // find item in the first level of categoryFilter and return the index
			//         // var index0 = lodash.findIndex($scope.categoryFilter, item);
			//         // var index0 = lodash.findIndex($scope.categoryFilter.parentIDs, item.id);
			//         var index0 = $scope.categoryFilter.parentIDs.indexOf(item.id);
			//         $log.debug('index0',index0);
			//         $log.debug('$scope.categoryFilter.parentIDs',$scope.categoryFilter.parentIDs);
			//         $log.debug('item.id',item.id);

			//         if(index0 !== -1){
			//         	// item is in the filter - remove it
			//         	$scope.categoryFilter.parentIDs.splice (index0, 1);
			//         }
			//         else{
			//         	// item isn't in the filter - add it
			//         	$scope.categoryFilter.parentIDs.push(item.id);
			//         }

			//         // filter the results based on what's in the category filter

			//         // $scope.filteredResults = filterWithOrFilter($scope.filteredResults, {
			//         // 	parentID:$scope.categoryFilter.parentIDs
			//         // });

			//         break;

			//     case 1:
			//     	// child
			//         $log.debug('depth', depth);

			//         var index1 = $scope.categoryFilter.childIDs.indexOf(item.id);

			//         $log.debug('index1',index1);
			//         $log.debug('$scope.categoryFilter.childIDs',$scope.categoryFilter.childIDs);
			//         $log.debug('item.id',item.id);

			//         if(index1 !== -1){
			//         	// item is in the filter - remove it
			//         	$scope.categoryFilter.childIDs.splice (index1, 1);
			//         }
			//         else{
			//         	// item isn't in the filter - add it
			//         	$scope.categoryFilter.childIDs.push(item.id);
			//         }

			//         break;

			//     case 2:
			//     	// leaf
			//     	$log.debug('depth', depth);

			//     	var index2 = $scope.categoryFilter.leafIDs.indexOf(item.id);

			//     	$log.debug('index2',index2);
			//     	$log.debug('$scope.categoryFilter.leafIDs',$scope.categoryFilter.leafIDs);
			//     	$log.debug('item.id',item.id);

			//     	if(index2 !== -1){
			//     		// item is in the filter - remove it
			//     		$scope.categoryFilter.leafIDs.splice (index2, 1);
			//     	}
			//     	else{
			//     		// item isn't in the filter - add it
			//     		$scope.categoryFilter.leafIDs.push(item.id);
			//     	}
			//     	break;

			//     default:
			//         $log.debug('depth must be 0, 1 or 2. Depth specified: ' + depth);
			// }

			// filterResults();
			$log.debug('$scope.categoryFilter',$scope.categoryFilter);
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
