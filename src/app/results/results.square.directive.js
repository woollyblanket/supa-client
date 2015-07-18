(function() {
	'use strict';

	angular.module('supa')
	  .directive('smSquare', smSquare);

	function smSquare() {
	    return {
	      	templateUrl: 'app/results/results.square.tpl.html',
	      	restrict: 'E',
	      	replace: true
	    };
	}
})();
