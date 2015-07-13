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
	var categories = [];

	function arrayObjectIndexOf(myArray, searchTerm, property) {
		var pos = myArray.map(function(e) {
			return e[property];
		}).indexOf(searchTerm);

		return pos;
	}

	function setCategories(aParent, theParentName, theChildName, isLeaf){
		if(isLeaf){
			if(aParent.name === theParentName && arrayObjectIndexOf(aParent.children, theChildName, 'name') !== -1){
				// 4 - At the leaf, add 1 to itemCount
				var duplicateCategory = aParent.children[arrayObjectIndexOf(aParent.children, theChildName, 'name')];
				duplicateCategory.itemCount++;
			}
			else if(aParent.name === theParentName && arrayObjectIndexOf(aParent.children, theChildName, 'name') === -1){
				aParent.children.push({
					name : theChildName,
					itemCount : 1,
					children : []
				});
			}
		}
		else{
			if(aParent.name === theParentName && arrayObjectIndexOf(aParent.children, theChildName, 'name') === -1){
				aParent.children.push({
					name : theChildName,
					itemCount : 0,
					children : []
				});
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

					// parsing the categories
					// "category": "Bakery|Bread|Wrapped Brown Bread"
					// "category": "Fresh Food|Fresh Poultry|Fresh Chicken"

					// 1 - Parse the categories into an array. [0] is parent, [n] is leaf.
					// 2 - Check if parent exists in categories, if not add it
					// 3 - Check if child exists in parent, if not add it. Keep going until we reach the leaf
					// 4 - At the leaf, add 1 to itemCount
					// 5 - At parent, sum the child itemCount, until we reach the last parent

					// categories should look like this:
					/*
					[{
						"name" : "Bakery",
						"itemCount" : 3,
						"children" : {
							"name" : "Bread",
							"itemCount" : 2,
							"children" : {
								"name" : "Wrapped Brown Bread",
								"itemCount" : 1,
								"children" : {}
							}
						}
					},
					{
						"name" : "Fresh Food",
						"itemCount" : 10,
						"children" : {
							"name" : "Fresh Poultry",
							"itemCount" : 5,
							"children" : {
								"name" : "Fresh Chicken",
								"itemCount" : 5,
								"children" : {}
							}
						}
					}]
					*/

					// 1 - Parse the categories into an array. [0] is parent, [n] is leaf.

					var itemCats = item.category.split('|');

					// 2 - Check if parent exists in categories, if not add it

					if (arrayObjectIndexOf(categories, itemCats[0], 'name') === -1) {
						categories.push({
							name : itemCats[0],
							itemCount : 0,
							children : []
						});
					}

					// 3 - Check if child exists in parent, if not add it.

					var count1 = 0;
					var count2 = 0;

					for (var j = 0, lenJ = categories.length; j < lenJ; j++) {
						setCategories(categories[j], itemCats[0], itemCats[1], false);

						// 3.5 - Keep going until we reach the leaf
						for (var k = 0, lenK = categories[j].children.length; k < lenK; k++) {
							setCategories(categories[j].children[k], itemCats[1], itemCats[2], true);

							// 5 - At parent, sum the child itemCount, until we reach the last parent
							for (var ii = 0, lenII = categories[j].children[k].children.length; ii < lenII; ii++) {
								count1 += categories[j].children[k].children[ii].itemCount;
							}

							categories[j].children[k].itemCount = count1;
							count1 = 0;
							count2 += categories[j].children[k].itemCount;
						}

						categories[j].itemCount = count2;
						count2 = 0;
					}

					$log.debug('categories');
					$log.debug(categories);

				}
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
		}
	};
});
