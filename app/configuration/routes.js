(function () {
	'use strict';

	angular
		.module('router', ['ui.router'])
		.config(function ($stateProvider, $urlRouterProvider) {
			$stateProvider
				.state('index', {
					abstract: true,
					url: '/index',
					views: {
						'layout': {
							templateUrl: 'views/layout.html',
							controller: 'IndexController'
						}
					}
				})
				.state('index.calendar', {
					url: '/calendar',
					views: {
						'content': {
							templateUrl: 'views/calendar.html'
						}
					}
				})

			;

			$urlRouterProvider.when('/index', '/index/calendar');

			$urlRouterProvider.otherwise('/index');
		});
})();
