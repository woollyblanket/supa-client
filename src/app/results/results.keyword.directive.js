(function() {
	'use strict';

	angular.module('supa')
	  	.directive('smKeyword', smKeyword);

  	function smKeyword() {
    	return {
		    templateUrl: 'app/results/results.keyword.tpl.html',
		    restrict: 'E',
		    replace: true
	    };
  	}
})();
