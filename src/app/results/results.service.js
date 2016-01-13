(function() {
	'use strict';

	angular.module('supa')
	 .factory('ShoppingList', ShoppingListFactory);


	function ShoppingListFactory($http, $q, $log, lodash) {
		var stores = [];
		var total = 0;
		var keywords = [];
		// var cats = [];
		// var leafIDs = [];
		// var childIDs = [];
		// var parentIDs = [];

		// var leafIDs1 = [];
		// var childIDs1 = [];
		// var parentIDs1 = [];

		var categories = [{
			'name': 'root',
			'id': 0,
			'parentNode': null,
			'active': true,
			'itemCount': 0
		}];

		var catID = 1;

		// function arrayObjectIndexOf(myArray, searchTerm, property) {
		// 	var pos = myArray.map(function(e) {
		// 		return e[property];
		// 	}).indexOf(searchTerm);

		// 	return pos;
		// }

		// function parseCats(item, categoryList){
		// 	// 1 - Parse the categories into an array. [0] is parent, [n] is leaf.

		// 	var itemCats = item.category.split('|');

		// 	// 2 - Check if parent exists in categories, if not add it

		// 	var randomParent = Math.random().toString(36).substr(7);

		// 	var index0 = arrayObjectIndexOf(categoryList, itemCats[0], 'name');

		// 	if (arrayObjectIndexOf(categoryList, itemCats[0], 'name') === -1) {
		// 		item.parentID = randomParent;

		// 		if(parentIDs1.ids){
		// 			parentIDs1.ids.push(randomParent);
		// 		}
		// 		else{
		// 			parentIDs1.ids = [];
		// 			parentIDs1.ids.push(randomParent);
		// 		}

		// 		parentIDs.push(randomParent);


		// 		categoryList.push({
		// 			name: itemCats[0],
		// 			itemCount: 0,
		// 			activeItemCount: 0,
		// 			active: 0,
		// 			children: [],
		// 			id: randomParent
		// 		});
		// 	}
		// 	else{

		// 		if(index0 !== -1){
		// 			item.parentID = categoryList[index0].id;
		// 		}
		// 	}

		// 	// 3 - Check if child exists in parent, if not add it.
		// 	var randomChild = Math.random().toString(36).substr(7);
		// 	for (var j = 0, lenJ = categoryList.length; j < lenJ; j++) {
		// 		var child = categoryList[j];
		// 		var index1 = arrayObjectIndexOf(child.children, itemCats[1], 'name');


		// 		// if we have the correct parent and the child hasn't been added yet
		// 		if (child.name === itemCats[0] && arrayObjectIndexOf(child.children, itemCats[1], 'name') === -1) {
		// 			//console.log('new child', randomChild);
		// 			item.childID = randomChild;

		// 			childIDs.push(randomChild);

		// 			// $log.debug('childIDs1', childIDs1);
		// 			// $log.debug('child.id', child.id);

		// 			var childObjIndex = arrayObjectIndexOf(childIDs1, child.id, 'parent');

		// 			if(childObjIndex === -1){
		// 				// parent isn't in the array already, add it
		// 				// $log.debug(child.id + ' parent not in the array');

		// 				var childObj = {};

		// 				childObj.parent = child.id;
		// 				childObj.ids = [];
		// 				childObj.ids.push(randomChild);

		// 				childIDs1.push(childObj);
		// 			}
		// 			else{
		// 				// parent is there, so add the child to ids array
		// 				// $log.debug(child.id + ' parent is in the array');
		// 				childIDs1[childObjIndex].ids.push(randomChild);

		// 			}

		// 			child.children.push({
		// 				name : itemCats[1],
		// 				active: 0,
		// 				itemCount : 0,
		// 				activeItemCount: 0,
		// 				children : [],
		// 				id: randomChild
		// 			});
		// 		}
		// 		else{

		// 			if(index1 !== -1 && index0 !== -1){
		// 				item.childID = child.children[index1].id;
		// 			}
		// 		}

		// 		var randomLeaf = Math.random().toString(36).substr(7);
		// 		// 4 - Keep going until we reach the leaf
		// 		for (var k = 0, lenK = child.children.length; k < lenK; k++) {
		// 			var leaf = child.children[k];
		// 			var index2 = arrayObjectIndexOf(leaf.children, itemCats[2], 'name');

		// 			if(leaf.name === itemCats[1] && arrayObjectIndexOf(leaf.children, itemCats[2], 'name') === -1){
		// 				item.leafID = randomLeaf;

		// 				leafIDs.push(randomLeaf);

		// 				var leafObjIndex = arrayObjectIndexOf(leafIDs1, leaf.id, 'child');

		// 				if(leafObjIndex === -1){
		// 					// child isn't in the array already, add it
		// 					// $log.debug(leaf.id + ' child not in the array');

		// 					var leafObj = {};

		// 					leafObj.parent = child.id;
		// 					leafObj.child = leaf.id;
		// 					leafObj.ids = [];
		// 					leafObj.ids.push(randomLeaf);

		// 					leafIDs1.push(leafObj);
		// 				}
		// 				else{
		// 					// child is there, so add the leaf to ids array
		// 					// $log.debug(leaf.id + ' child is in the array');
		// 					leafIDs1[leafObjIndex].ids.push(randomLeaf);

		// 				}

		// 				leafIDs1.parent = child.id;
		// 				leafIDs1.child = leaf.id;
		// 				leafIDs1.ids = [];
		// 				leafIDs1.ids.push(randomLeaf);

		// 				leaf.children.push({
		// 					name : itemCats[2],
		// 					active: 0,
		// 					itemCount : 0,
		// 					activeItemCount: 0,
		// 					children : [],
		// 					id: randomLeaf
		// 				});
		// 			}
		// 			else{

		// 				if(index2 !== -1 && index1 !== -1 && index0 !== -1){
		// 					item.leafID = leaf.children[index2].id;
		// 				}
		// 			}
		// 		}
		// 	}
		// 	return categoryList;
		// }

		// function updateCategoryCount(ItemList, categoriesArray, activeCount){

		// 	// if(activeCount === 1) activeItemCount;
		// 	// if(activeCount === 0) itemCount;

		// 	// Take the filtered list of items, take the current category array
		// 	// Mark all the items in the category array as inactive (3 levels deep)
		// 	// Mark all the activeItemCounts/itemCounts as 0

		// 	for (var i = 0, lenI = categoriesArray.length; i < lenI; i++) {
		// 		var parent = categoriesArray[i];
		// 		parent.active = 0;
		// 		if(activeCount === 1){parent.activeItemCount = 0;}
		// 		if(activeCount === 0){parent.itemCount = 0;}

		// 		for (var j = 0, lenJ = parent.children.length; j < lenJ; j++) {
		// 			var child = parent.children[j];
		// 			child.active = 0;
		// 			if(activeCount === 1){child.activeItemCount = 0;}
		// 			if(activeCount === 0){child.itemCount = 0;}

		// 			for (var k = 0, lenK = child.children.length; k < lenK; k++) {
		// 				var leaf = child.children[k];
		// 				leaf.active = 0;
		// 				if(activeCount === 1){leaf.activeItemCount = 0;}
		// 				if(activeCount === 0){leaf.itemCount = 0;}

		// 				// Go through the filtered list, parse the category tree, mark it as active in the category array
		// 				// If it's not in the filtered list, it will not be active in the category array, because we first
		// 				// made everything inactive
		// 				for (var ii = 0, lenII = ItemList.length; ii < lenII; ii++) {
		// 					var item = ItemList[ii];
		// 					var catArray = item.category.split('|');
		// 					var parsedLeaf = catArray[catArray.length - 1];

		// 					if(leaf.name === parsedLeaf){
		// 						leaf.active = 1;
		// 						child.active = 1;
		// 						parent.active = 1;

		// 						// Sum up the item counts of the active items
		// 						if(activeCount === 1){
		// 							leaf.activeItemCount++;
		// 							child.activeItemCount++;
		// 							parent.activeItemCount++;
		// 						}
		// 						if(activeCount === 0){
		// 							leaf.itemCount++;
		// 							child.itemCount++;
		// 							parent.itemCount++;
		// 						}
		// 					}
		// 				}
		// 			}
		// 		}
		// 	}
		// }


		function walkUpCatTree(nodeId, input){

			// input is optional, if it's not set, make it an empty array
			input = (typeof input === 'undefined') ? [] : input;
			// var parentNodeNames = [];

			// $log.debug('nodeId',nodeId);

			if (nodeId !== 0){

				// given a node's ID, find its parent's node ID and its name

				// var currentNodeId = nodeId;
				//$log.debug('currentNodeId', currentNodeId);
				var currentNodeIndex = lodash.findIndex(categories, 'id', nodeId);
				// $log.debug('currentNodeIndex',currentNodeIndex);
				// var currentNodeName = categories[currentNodeIndex].name;
				// $log.debug('currentNodeName',currentNodeName);

				var parentNodeId = categories[currentNodeIndex].parentNode;
				// $log.debug('parentNodeId',parentNodeId);
				var parentNodeIndex = lodash.findIndex(categories, 'id', parentNodeId);
				// $log.debug('parentNodeIndex',parentNodeIndex);
				var parentNodeName = categories[parentNodeIndex].name;
				// $log.debug('parentNodeName',parentNodeName);

				input.push(parentNodeName);

				// $log.debug('input',input);

				return walkUpCatTree(parentNodeId,input);
			}
			else{
				// we've reached the root. Stop and return
				// $log.debug('returning. nodeId is ' + nodeId);
				// $log.debug('output',output);
				input.reverse();
				return input;
			}

		}

		function walkTreeForCounts(nodeId){

			// get the count of the current node
			var currentNodeIndex = lodash.findIndex(categories, 'id', nodeId);
			var currentNodeCount = categories[currentNodeIndex].itemCount;

			// get the count of the parent node

			var parentNodeId = categories[currentNodeIndex].parentNode;

			// stop when the parent node is null as we've reached the root
			if(parentNodeId !== null){
				var parentNodeIndex = lodash.findIndex(categories, 'id', parentNodeId);
				var parentNodeCount = categories[parentNodeIndex].itemCount;

				$log.debug(categories[currentNodeIndex].name,currentNodeCount);
				$log.debug(categories[parentNodeIndex].name,parentNodeCount);
				$log.debug(parentNodeCount,'+',currentNodeCount,'=',parentNodeCount + currentNodeCount);

				// add the current node count to the parent node
				categories[parentNodeIndex].itemCount += currentNodeCount;

				// and repeat
				walkTreeForCounts(parentNodeId);
			}

			// start at a leaf
			// get the parent id
			// find other leaves with that parent id
			// add them up
			// only do this if the parent's count is 0
		}

		var parseCategories = function(item){
			// mostly will be done on the server side.

			function pushCat(i){
				var parentID;

				if (i === 0) {
					// the parent is the root node
					parentID = 0;
				}
				else{
					// the parent isn't the root
					// find the id of the parent.

					// find the item in the categories array which has the name of the
					// previous item in itemCats and return its id
					parentID = lodash.result(lodash.find(categories, 'name', itemCats[i-1]), 'id');
				}

				var category = {
					name: catName,
					id: catID,
					parentNode: parentID,
					active: false,
					itemCount: 0
				};

				categories.push(category);

				item.categoryID = catID;

				catID++;
			}


			var itemCats = item.category.split('|');

			for (var i = 0; i < itemCats.length; i++) {
				// grab the category name
				var catName = itemCats[i];

				// check if that name has already been added to the categories array

				// need to be aware that the same name might be used more than once
				// in this case, the ids needs to be the distinguisher.

				var index = lodash.findIndex(categories, 'name', catName);

				if (index === -1) {
					// category isn't in the finished category array
					// construct an object and push it to the array

					// parentNode is the id of the previous item in itemCats.
					// if there isn't a previous item, then the parent is the root
					// $log.debug(catName, ' new Cat');
					pushCat(i);
				}
				else{
					// category is in the array, meaning we have another item with the same category

					// we need to check if the parent names match all the way up the chain
					// if they do, then we have the right category
					// if they don't, then we have a new category with the same name, so
					// we need to add it with a new ID

					// construct an array with the names of the parents using the defined parentNode
					// compare that array to itemCats (from index i)
					// if they match, we have the same category

					var catNames = walkUpCatTree(index);

					// remove everything after the current index and add 'root' to the start
					var orginalCatNames = lodash.slice(itemCats, 0, i);
					orginalCatNames.unshift('root');

					// $log.debug('catNames',catNames);
					// $log.debug('orginalCatNames',orginalCatNames);

					if(lodash.isEqual(orginalCatNames, catNames)){
						// same name, same category
						item.categoryID = categories[index].id;
						// $log.debug(catName, ' same name, old category');

						//categories[index].itemCount++;
					}
					else{
						// same name, different category
						// create a new entry
						// $log.debug(catName, ' same name, new category');
						pushCat(i);
					}
				}
			}
		};

		function setCategoryCounts(item){
			// grab the id of the category

			var catID = item.categoryID;

			// for every ID we grab, add 1 to the item counts
			// this will set the counts for the leafs
			var index = lodash.findIndex(categories, 'id', catID);
			categories[index].itemCount++;

			// walk up the tree adding itemCounts as we go
			walkTreeForCounts(catID);

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
				//return $http.get('app/results/results.dummy.large.json')
				return $http.get('app/results/results.dummy.small.json')
				//return $http.get('http://tranquil-tundra-3993.herokuapp.com/search/milk|cheese|bread')
				.success(function(response) {
					$log.debug('response.length',response.length);
					for (var i = 0, len = response.length; i < len; i++) {
						var item = response[i];
						item.qty = 1;
						item.active = 1;
						//item.uniqueID = item.store + '_' + item.id;

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

						//cats = parseCats(item, cats);
						parseCategories(item);

						setCategoryCounts(item);

					}

					//updateCategoryCount(response, cats, 0);

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
			// getCatIDs: function(){
			// 	return {
			// 		leafIDs: leafIDs,
			// 		childIDs: childIDs,
			// 		parentIDs: parentIDs
			// 	};
			// },
			// getCatIDs1: function(){
			// 	return {
			// 		leafIDs: leafIDs1,
			// 		childIDs: childIDs1,
			// 		parentIDs: parentIDs1
			// 	};
			// },
			getCategories: function(){
				return categories;
			}
			// updateCategoriesArray: function(filteredItemList, categoriesArray){
			// 	// loop through the filtered items and grab the category
			// 	// parse it into the categoriesArray

			// 	for (var i = 0, len = filteredItemList.length; i < len; i++) {
			// 		var category = filteredItemList[i].category;
			// 		categoriesArray = parseCats(category, categoriesArray);
			// 	}
			// },
			// updateCatCount: function(ItemList, categoriesArray, activeCount){
			// 	updateCategoryCount(ItemList, categoriesArray, activeCount);
			// }

		};
	}
})();
