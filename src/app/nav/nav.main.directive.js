(function(){
	'use strict';

	 angular.module('supa')
	 .directive('smNavbar', smNavbar);

	 function smNavbar() {
	 	return {
	 		templateUrl: 'app/nav/nav.main.tpl.html',
	 		replace: true,
	 		restrict: 'E'
	 	};
	 }
})();
