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
    		return $http.get('/content/dummyjson/MOCK_DATA.json')
    		.success(function(response) {
    			for (var i = 0, len = response.length; i < len; i++) {
    			  	var item = response[i];
    			  	item.qty = 1;
    			  	item.active = 1;

    			  	total += item.price * item.qty;

			  		if (stores.indexOf(item.product) === -1) {
			  			stores.push(item.product);
			  	        // alphabetise the list
			  	        stores.sort();
			  	    }
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
    	getTotal: function(){
    		return total;
    	}
    };
});
