(function(){
	'use strict';

	angular.module('supa')
	 .directive('smInput', smInput);

	function smInput() {
	 	return {
	 		templateUrl: 'app/profile/profile.input.tpl.html',
	 		replace: true,
	 		restrict: 'E',
	 		scope: {
	 			label: '@',
	 			value: '@',
	 			type: '@'
	 		}
	 	};
	}
})();
