'use strict';

/**
 * @ngdoc service
 * @name clientApp.shoppinglist
 * @description
 * # shoppinglist
 * Factory in the clientApp.
 */
 angular.module('clientApp')
 .factory('ShoppingList', function ShoppingListFactory($http) {

    // Public API here
    return {
    	getSuggestions: function (shoppingitem) {
    		return $http.get('/content/dummyjson/MOCK_DATA.json', {
    			params: {
    				item: shoppingitem
    			}
    		});
    	},
    	results: function () {
    		return $http.get('/content/dummyjson/MOCK_DATA.json');
    	}
    };
});
