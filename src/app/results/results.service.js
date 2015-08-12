(function() {
	'use strict';

	angular.module('supa')
	 .factory('ShoppingList', ShoppingListFactory);


	function ShoppingListFactory($http, $q, $log) {
		var stores = [];
		var total = 0;
		var keywords = [];
		var cats = [];
		var leafIDs = [];
		var childIDs = [];
		var parentIDs = [];

		var leafIDs1 = [];
		var childIDs1 = [];
		var parentIDs1 = [];

		function arrayObjectIndexOf(myArray, searchTerm, property) {
			var pos = myArray.map(function(e) {
				return e[property];
			}).indexOf(searchTerm);

			return pos;
		}

		function parseCats(item, categoryList){
			// 1 - Parse the categories into an array. [0] is parent, [n] is leaf.

			var itemCats = item.category.split('|');

			// 2 - Check if parent exists in categories, if not add it

			var randomParent = Math.random().toString(36).substr(7);

			var index0 = arrayObjectIndexOf(categoryList, itemCats[0], 'name');

			if (arrayObjectIndexOf(categoryList, itemCats[0], 'name') === -1) {
				item.parentID = randomParent;

				if(parentIDs1.ids){
					parentIDs1.ids.push(randomParent);
				}
				else{
					parentIDs1.ids = [];
					parentIDs1.ids.push(randomParent);
				}

				parentIDs.push(randomParent);


				categoryList.push({
					name: itemCats[0],
					itemCount: 0,
					activeItemCount: 0,
					active: 0,
					children: [],
					id: randomParent
				});
			}
			else{

				if(index0 !== -1){
					item.parentID = categoryList[index0].id;
				}
			}

			// 3 - Check if child exists in parent, if not add it.
			var randomChild = Math.random().toString(36).substr(7);
			for (var j = 0, lenJ = categoryList.length; j < lenJ; j++) {
				var child = categoryList[j];
				var index1 = arrayObjectIndexOf(child.children, itemCats[1], 'name');


				// if we have the correct parent and the child hasn't been added yet
				if (child.name === itemCats[0] && arrayObjectIndexOf(child.children, itemCats[1], 'name') === -1) {
					//console.log('new child', randomChild);
					item.childID = randomChild;

					childIDs.push(randomChild);

					// $log.debug('childIDs1', childIDs1);
					// $log.debug('child.id', child.id);

					var childObjIndex = arrayObjectIndexOf(childIDs1, child.id, 'parent');

					if(childObjIndex === -1){
						// parent isn't in the array already, add it
						// $log.debug(child.id + ' parent not in the array');

						var childObj = {};

						childObj.parent = child.id;
						childObj.ids = [];
						childObj.ids.push(randomChild);

						childIDs1.push(childObj);
					}
					else{
						// parent is there, so add the child to ids array
						// $log.debug(child.id + ' parent is in the array');
						childIDs1[childObjIndex].ids.push(randomChild);

					}

					child.children.push({
						name : itemCats[1],
						active: 0,
						itemCount : 0,
						activeItemCount: 0,
						children : [],
						id: randomChild
					});
				}
				else{

					if(index1 !== -1 && index0 !== -1){
						item.childID = child.children[index1].id;
					}
				}

				var randomLeaf = Math.random().toString(36).substr(7);
				// 4 - Keep going until we reach the leaf
				for (var k = 0, lenK = child.children.length; k < lenK; k++) {
					var leaf = child.children[k];
					var index2 = arrayObjectIndexOf(leaf.children, itemCats[2], 'name');

					if(leaf.name === itemCats[1] && arrayObjectIndexOf(leaf.children, itemCats[2], 'name') === -1){
						item.leafID = randomLeaf;

						leafIDs.push(randomLeaf);

						var leafObjIndex = arrayObjectIndexOf(leafIDs1, leaf.id, 'child');

						if(leafObjIndex === -1){
							// child isn't in the array already, add it
							// $log.debug(leaf.id + ' child not in the array');

							var leafObj = {};

							leafObj.parent = child.id;
							leafObj.child = leaf.id;
							leafObj.ids = [];
							leafObj.ids.push(randomLeaf);

							leafIDs1.push(leafObj);
						}
						else{
							// child is there, so add the leaf to ids array
							// $log.debug(leaf.id + ' child is in the array');
							leafIDs1[leafObjIndex].ids.push(randomLeaf);

						}

						leafIDs1.parent = child.id;
						leafIDs1.child = leaf.id;
						leafIDs1.ids = [];
						leafIDs1.ids.push(randomLeaf);

						leaf.children.push({
							name : itemCats[2],
							active: 0,
							itemCount : 0,
							activeItemCount: 0,
							children : [],
							id: randomLeaf
						});
					}
					else{

						if(index2 !== -1 && index1 !== -1 && index0 !== -1){
							item.leafID = leaf.children[index2].id;
						}
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
				$log.debug(shoppingitem);
				// return $http.get('/content/dummyjson/MOCK_DATA.json', {
				// 	params: {
				// 		item: shoppingitem
				// 	}
				// });
			},
			getResults: function () {
				// return $http.get('app/results/results.dummy.json')
				return $http.get('app/results/results.dummy.large.json')
				// return $http.get('app/results/results.dummy.small.json')
				//return $http.get('http://tranquil-tundra-3993.herokuapp.com/search/milk|cheese|bread')
				.success(function(response) {
					$log.debug('response.length',response.length);
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

						cats = parseCats(item, cats);

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
			getCatIDs: function(){
				return {
					leafIDs: leafIDs,
					childIDs: childIDs,
					parentIDs: parentIDs
				};
			},
			getCatIDs1: function(){
				return {
					leafIDs: leafIDs1,
					childIDs: childIDs1,
					parentIDs: parentIDs1
				};
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
	}
})();
