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
 	};
 });
