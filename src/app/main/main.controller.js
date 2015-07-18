(function() {
  'use strict';

  angular
    .module('supa')
    .controller('HomeCtrl', HomeCtrl);

  /** @ngInject */
  function HomeCtrl($timeout, webDevTec, toastr, $scope, $http, $window, Geocode, Flash, ShoppingList, $log) {
  //   var vm = this;

  //   vm.awesomeThings = [];
  //   vm.classAnimation = '';
  //   vm.creationDate = 1437175315922;
  //   vm.showToastr = showToastr;

  //   activate();

  //   function activate() {
  //     getWebDevTec();
  //     $timeout(function() {
  //       vm.classAnimation = 'rubberBand';
  //     }, 4000);
  //   }

  //   function showToastr() {
  //     toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
  //     vm.classAnimation = '';
  //   }

  //   function getWebDevTec() {
  //     vm.awesomeThings = webDevTec.getTec();

  //     angular.forEach(vm.awesomeThings, function(awesomeThing) {
  //       awesomeThing.rank = Math.random();
  //     });
  //   }
  // }
  	 	$scope.getSuggestions = function(val){
  	 		return ShoppingList.getSuggestions(val);
  	 	};

  	 	// http://tranquil-tundra-3993.herokuapp.com/supapi

  	    // we will store all of our form data in this object
  	    $scope.formData = {};

  	    $scope.supportsGeo = $window.navigator;

  	    // function to process the form
  	    $scope.processForm = function() {
  	    	$log.debug('Location name is: ' + $scope.formData.location.formatted_address +
  	    		'\nLocation lat is: ' + $scope.formData.location.lat +
  	    		'\nLocation lng is: ' + $scope.formData.location.lng +
  	    		'\nShoppinglist is: ' + $scope.formData.list);
  	    };

  	    // for getting the location when the user types it
  	    $scope.getGeo = function(val, component) {
  	    	// .success and .error only work with the http service!
  	    	// must use .then instead
  	    	return Geocode.geo(val, component)
  	    	.then(function(data){
  	    		return data.data.results.map(function(item){
  	    			return {
  	    				lat: item.geometry.location.lat,
  	    				lng: item.geometry.location.lng,
  	    				formatted_address: item.formatted_address
  	    			};
  	    		});
  	    	})
  	    	.catch(function(error){
  	    		$log.debug('Error: ' + error);
  	    	});
  		};

  		function setLocation(aName, aLat, aLng){
  			$scope.formData.location = {
  				lat: aLat,
  				lng: aLng,
  				formatted_address: aName
  			};
  		}

  	    // for grabbing the location when the user allows us to
  	    $scope.getGeoLocation = function() {

  	    	//$scope.statusMessage = 'Determining location...';
  	    	Flash.create('info', '<span class="glyphicon glyphicon-refresh spinning" aria-hidden="true"></span> Determining location...');

  	    	// using the navigator to get the user's location
  	    	$window.navigator.geolocation.getCurrentPosition(function(position) {
  	    		var lat = position.coords.latitude;
  	    		var lng = position.coords.longitude;
  	    		$scope.$apply(function() {
  	    			setLocation('', lat, lng);
  	    			$scope.next = true;
  	    			Flash.dismiss();
  	    		});
  	    		return Geocode.reverseGeo(lat, lng)
  	    		.then(function(response){
  	    			setLocation(response.data.results[0].formatted_address, lat, lng);
  	    		})
  	    		.catch(function(error){
  		    		$log.debug('Error: ' + error);
  		    	});
  	    	}, function(error) {
  	    		Flash.dismiss();

  	    		$scope.$apply(function(){
  	    			switch(error.code) {
  	    				case error.PERMISSION_DENIED:
  	    				Flash.create('danger', 'You denied the request for Geolocation.');
  	    				break;
  	    				case error.POSITION_UNAVAILABLE:
  	    				Flash.create('danger', 'Location information is unavailable.');
  	    				break;
  	    				case error.TIMEOUT:
  	    				Flash.create('danger', 'The request to get location timed out.');
  	    				break;
  	    				case error.UNKNOWN_ERROR:
  	    				Flash.create('danger', 'An unknown error occurred.');
  	    				break;
  	    			}
  	    		});
  	    	});
  		};
  	}
})();
