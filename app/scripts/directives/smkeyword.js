'use strict';

/**
 * @ngdoc directive
 * @name clientApp.directive:smKeyword
 * @description
 * # smKeyword
 */
angular.module('clientApp')
  .directive('smKeyword', function () {
    return {
	    templateUrl: '/views/directives/smkeyword.html',
	    restrict: 'E',
	    replace: true
    };
  });
