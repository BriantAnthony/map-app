var map = angular.module('map', ['geolocation', 'ngRoute']);

map.config(function($routeProvider){

	// Join Team Control Panel
		$routeProvider.when('/join', {
			controller: 'UserCtrl',
			templateUrl: 'map/partials/addForm.html'

			// Find Teammates Control Panel
		}).when('/find', {
			controller: 'QueryCtrl',
			templateUrl: 'map/partials/queryForm.html'
			
		}).otherwise({redirectTo:'/join'});

});