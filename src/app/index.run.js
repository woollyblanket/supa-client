(function() {
  'use strict';

  angular
    .module('supa')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope, $state) {
  	// https://github.com/angular-ui/ui-router/issues/1584#issuecomment-75137373
  	$rootScope.$on('$stateChangeStart', function(evt, to, params) {
  		if (to.redirectTo) {
  			evt.preventDefault();
  			$state.go(to.redirectTo, params);
  		}
  	});

    $log.debug('runBlock end');
  }

})();
