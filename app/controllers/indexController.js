(function () {
	'use strict';

	angular
		.module('indexCtrl', ['eventsService'])
		.controller('IndexController', indexController);

	indexController.$inject = [
		'$scope',
		'$rootScope',
		'$log',
		'EventsService',
		'$state'
	];

	function indexController($scope, $rootScope, $log, EventsService, $state) {
		$log.log('index ctrl');


		$scope.init = function () {

		};

		$scope.init();
	}

})();
