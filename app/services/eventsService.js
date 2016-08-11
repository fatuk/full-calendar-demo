(function () {
	'use strict';

	angular.module('eventsService', [])
		.factory('EventsService', eventsService);

	eventsService.$inject = [
		'$resource'
	];

	function eventsService($resource) {
		var API_URL = 'http://localhost:8080/';

		return $resource(API_URL + 'events/:id', null, {
			save: {
				method: 'POST'
			},
			update: {
				method: 'PUT',
				params: {
					id: '@id'
				}
			},
			get: {
				method: 'GET',
				params: {
					id: '@id'
				}
			},
			getMy: {
				method: 'GET',
				params: {
					id: 'my'
				},
				isArray: true
			},
			delete: {
				method: 'DELETE',
				params: {
					id: '@id'
				}
			},
			assignList: {
				method: 'POST',
				params: {
					id: '@id',
					action: 'lists',
					item_id: '@item_id'
				}
			},
			unassignList: {
				method: 'DELETE',
				params: {
					id: '@id',
					action: 'lists',
					item_id: '@item_id'
				}
			}
		});
	}

})();
