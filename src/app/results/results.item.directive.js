(function() {
	'use strict';

	angular.module('supa')
	 .directive('smResult', smResult);

	function smResult() {
	 	return {
	 		templateUrl: 'app/results/results.item.tpl.html',
	 		restrict: 'A',
	 		replace: true
	 	};
	}
})();
