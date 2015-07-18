(function() {
  'use strict';

  angular
    .module('supa')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'HomeCtrl',
        redirectTo: 'home.location'
      })

      .state('about', {
      	url: '/about',
      	templateUrl: 'app/about/about.main.html',
      	redirectTo: 'about.theApp'
      })

      .state('profile', {
      	url: '/profile',
      	templateUrl: 'app/profile/profile.main.html',
      	redirectTo: 'profile.details'
      })

      .state('signup', {
      	url: '/signup',
      	templateUrl: 'app/signup/signup.html',
      	controller: 'SignupCtrl'
      })

      .state('notfound', {
      	url: '/notfound',
      	templateUrl: 'app/404/404.html'
      })

      .state('results',{
      	url: '/results',
      	templateUrl: 'app/results/results.html',
      	controller: 'ResultsCtrl'
      })

      // nested states
      // each of these sections will have their own view
      .state('home.location', {
      	url: '',
      	templateUrl: 'app/main/main.location.html'
      })

      .state('home.shoppinglist', {
      	url: '',
      	templateUrl: 'app/main/main.shoppinglist.html'
      })

      .state('about.theApp', {
      	url: '/theapp',
      	templateUrl: 'app/about/about.theapp.html'
      })

      .state('about.wasfi', {
      	url: '/wasfi',
      	templateUrl: 'app/about/about.wasfi.html'
      })

      .state('about.marco', {
      	url: '/marco',
      	templateUrl: 'app/about/about.marco.html'
      })

      .state('about.amanda', {
      	url: '/amanda',
      	templateUrl: 'app/about/about.amanda.html'
      })

      .state('profile.options', {
      	url: '/options',
      	templateUrl: 'app/profile/profile.options.view.html'
      })

      .state('profile.details', {
      	url: '/details',
      	templateUrl: 'app/profile/profile.details.view.html'
      })

      .state('profile.details.edit', {
      	url: '/edit',
      	templateUrl: 'app/profile/profile.details.edit.html'
      });

    $urlRouterProvider.otherwise('/notfound');
  }

})();
