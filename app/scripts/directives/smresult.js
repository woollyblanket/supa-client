'use strict';

/**
 * @ngdoc directive
 * @name clientApp.directive:smResult
 * @description
 * # smResult
 */
 angular.module('clientApp')
 .directive('smResult', function () {
 	return {
 		templateUrl: '/views/directives/smresult.html',
 		restrict: 'A',
 		replace: true
 		// scope: {
 		// 	image: '@',
 		// 	description: '@',
 		// 	price: '@',
 		// 	store: '@'
 		// },
 		// controller: function($scope){
 		// 	$scope.removeItem = function(index) {
 		// 		// console.log($scope.results);
 		// 	    $scope.results.splice(index, 1);
 		// 	};
 		// }
 	};
 });
