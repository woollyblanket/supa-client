'use strict';

/**
 * @ngdoc directive
 * @name clientApp.directive:smCategory
 * @description
 * # smCategory
 */
angular.module('clientApp')
  .directive('smCategory', function () {
    return {
      templateUrl: '/views/directives/smcategory.html',
      restrict: 'E',
      replace: true
    };
  });
