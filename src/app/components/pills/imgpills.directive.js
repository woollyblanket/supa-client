(function(){

	'use strict';

	angular.module('supa')
	  .directive('smImgPills', smImgPills);

  	function smImgPills() {
    	return {
      		templateUrl: 'app/components/pills/imgpills.html',
      		restrict: 'E',
      		replace: true,
      		scope:{
      			link: '@',
      			img: '@',
  				text: '@'
      		}
    	};
 	}
})();
