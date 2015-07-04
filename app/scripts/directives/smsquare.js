'use strict';

/**
 * @ngdoc directive
 * @name clientApp.directive:smSquare
 * @description
 * # smSquare
 */
angular.module('clientApp')
  .directive('smSquare', function () {
    return {
      templateUrl: '/views/directives/smsquare.html',
      restrict: 'E',
      replace: true
    };
  });
