'use strict';

/**
 * @ngdoc service
 * @name clientApp.shoppinglist
 * @description
 * # shoppinglist
 * Factory in the clientApp.
 */
 angular.module('clientApp')
 .factory('ShoppingList', function ShoppingListFactory($http, $q, $log) {
	var stores = [];
	var total = 0;
	var keywords = [];
	var cats = [];

	function arrayObjectIndexOf(myArray, searchTerm, property) {
		var pos = myArray.map(function(e) {
			return e[property];
		}).indexOf(searchTerm);

		return pos;
	}

	function parseCats(categoryString, categoryList){
		// 1 - Parse the categories into an array. [0] is parent, [n] is leaf.

		var itemCats = categoryString.split('|');

		// 2 - Check if parent exists in categories, if not add it

		if (arrayObjectIndexOf(categoryList, itemCats[0], 'name') === -1) {
			categoryList.push({
				name: itemCats[0],
				itemCount: 0,
				activeItemCount: 0,
				active: 0,
				children: []
			});
		}

		// 3 - Check if child exists in parent, if not add it.

		for (var j = 0, lenJ = categoryList.length; j < lenJ; j++) {
			var child = categoryList[j];

			if (child.name === itemCats[0] &&arrayObjectIndexOf(child.children, itemCats[1], 'name') === -1) {
				child.children.push({
					name : itemCats[1],
					active: 0,
					itemCount : 0,
					activeItemCount: 0,
					children : []
				});
			}

			// 4 - Keep going until we reach the leaf
			for (var k = 0, lenK = child.children.length; k < lenK; k++) {
				var leaf = child.children[k];

				if(leaf.name === itemCats[1] && arrayObjectIndexOf(leaf.children, itemCats[2], 'name') === -1){
					leaf.children.push({
						name : itemCats[2],
						active: 0,
						itemCount : 0,
						activeItemCount: 0,
						children : []
					});
				}
			}
		}

		return categoryList;
	}

	function updateCategoryCount(ItemList, categoriesArray, activeCount){

		// if(activeCount === 1) activeItemCount;
		// if(activeCount === 0) itemCount;

		// Take the filtered list of items, take the current category array
		// Mark all the items in the category array as inactive (3 levels deep)
		// Mark all the activeItemCounts/itemCounts as 0

		for (var i = 0, lenI = categoriesArray.length; i < lenI; i++) {
			var parent = categoriesArray[i];
			parent.active = 0;
			if(activeCount === 1){parent.activeItemCount = 0;}
			if(activeCount === 0){parent.itemCount = 0;}

			for (var j = 0, lenJ = parent.children.length; j < lenJ; j++) {
				var child = parent.children[j];
				child.active = 0;
				if(activeCount === 1){child.activeItemCount = 0;}
				if(activeCount === 0){child.itemCount = 0;}

				for (var k = 0, lenK = child.children.length; k < lenK; k++) {
					var leaf = child.children[k];
					leaf.active = 0;
					if(activeCount === 1){leaf.activeItemCount = 0;}
					if(activeCount === 0){leaf.itemCount = 0;}

					// Go through the filtered list, parse the category tree, mark it as active in the category array
					// If it's not in the filtered list, it will not be active in the category array, because we first
					// made everything inactive
					for (var ii = 0, lenII = ItemList.length; ii < lenII; ii++) {
						var item = ItemList[ii];
						var catArray = item.category.split('|');
						var parsedLeaf = catArray[catArray.length - 1];

						if(leaf.name === parsedLeaf){
							leaf.active = 1;
							child.active = 1;
							parent.active = 1;

							// Sum up the item counts of the active items
							if(activeCount === 1){
								leaf.activeItemCount++;
								child.activeItemCount++;
								parent.activeItemCount++;
							}
							if(activeCount === 0){
								leaf.itemCount++;
								child.itemCount++;
								parent.itemCount++;
							}
						}
					}
				}
			}
		}
	}

	// Public API here
	return {
		getSuggestions: function (shoppingitem) {
			return $http.get('/content/dummyjson/MOCK_DATA.json', {
				params: {
					item: shoppingitem
				}
			});
		},
		getResults: function () {
			return $http.get('/content/dummyjson/dummy_results.json')
			.success(function(response) {
				for (var i = 0, len = response.length; i < len; i++) {
					var item = response[i];
					item.qty = 1;
					item.active = 1;
					item.uniqueID = item.store + '_' + item.id;

					total += item.price * item.qty;

					if (stores.indexOf(item.store) === -1) {
						stores.push(item.store);
						// alphabetise the list
						stores.sort();
					}

					if (keywords.indexOf(item.keyword) === -1) {
						keywords.push(item.keyword);
						// alphabetise the list
						keywords.sort();
					}

					cats = parseCats(item.category, cats);

				}

				updateCategoryCount(response, cats, 0);

				return response;
			})
			.error(function(msg, code) {
				$q.reject(msg);
				$log.error(msg, code);
			});
		},
		getStores: function(){
			return stores;
		},
		getKeywords: function(){
			return keywords;
		},
		getTotal: function(){
			return total;
		},
		getCategories: function(){
			return cats;
		},
		updateCategoriesArray: function(filteredItemList, categoriesArray){
			// loop through the filtered items and grab the category
			// parse it into the categoriesArray

			for (var i = 0, len = filteredItemList.length; i < len; i++) {
				var category = filteredItemList[i].category;
				categoriesArray = parseCats(category, categoriesArray);
			}
		},
		updateCatCount: function(ItemList, categoriesArray, activeCount){
			updateCategoryCount(ItemList, categoriesArray, activeCount);
		}

	};
});
