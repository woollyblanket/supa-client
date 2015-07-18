(function() {
	'use strict';

	angular.module('supa')
	  .directive('smCategory', smCategory);

	function smCategory() {
		return {
			templateUrl: 'app/results/results.category.tpl.html',
			restrict: 'E',
			replace: true
		};
	}
})();
