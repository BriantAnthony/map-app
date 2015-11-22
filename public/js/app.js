var app = angular.module('meanMapApp', ['addCtrl', 'queryCtrl', 'geolocation', 'gservice', 'ngRoute']);

	app.config(function($routeProvider) {

		// Join Team Control Panel
		$routeProvider.when('/join', {
			controller: 'addCtrl',
			templateUrl: 'partials/addForm.html'

			// Find Teammates Control Panel
		}).when('/find', {
			controller: 'queryCtrl',
			templateUrl: 'partials/queryForm.html'
			
		}).otherwise({redirectTo:'/join'})
	});