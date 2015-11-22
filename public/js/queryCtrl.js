var queryCtrl = angular.module('queryCtrl', ['geolocation', 'gservice']);
	
	queryCtrl.controller('queryCtrl', ['$scope', '$log', '$http', '$rootScope', 'geolocation', 'gservice', function($scope, $log, $http, $rootScope, geolocation, gservice) {

		// Initialize Variables
		$scope.formData = {};
		var queryBody = {};

		// Functions

		// Get User's HTML5 coordinates
		geolocation.getLocation().then(function(data){
			coords = {lat:data.coords.latitude, long:data.coords.longitude};

			// Set lat and long equal to HTML5 coordinates
			$scope.formData.longitude = parseFloat(coords.long).toFixed(3);
			$scope.formData.latitude = parseFloat(coords.lat).toFixed(3);
		});

		// Get coordinated based on mouse click
		$rootScope.$on('clicked', function(){

			// Run the gservice function to ID coordinates
			$scope.$apply(function(){
				$scope.formData.latitude = parseFloat(gservice.clickLat).toFixed(3);
				$scope.formData.longitude = parseFloat(gservice.clickLong).toFixed(3);
			});
		});

		// Incorporate query params into JSON queryBody
		$scope.queryUsers = function(){

			// Assemble Query Body
			queryBody = {
				longitude: parseFloat($scope.formData.longitude),
				latitude: parseFloat($scope.formData.latitude),
				distance: parseFloat($scope.formData.distance),
				male: $scope.formData.male,
				female: $scope.formData.female,
				other: $scope.formData.other,
				minAge: $scope.formData.minAge,
				maxAge: $scope.formData.maxAge,
				favlang: $scope.formData.favlang,
				reqVerified: $scope.formData.reqVerified
			};

			// Post the queryBody to /query API route
			$http.post('/api/query', queryBody)
				.success(function(queryResults){
					gservice.refresh(queryBody.latitude, queryBody.longitude, queryResults);

					// Count number of record retrieved for panel-footer
					$scope.queryCount = queryResults.length;
				})
				.error(function(queryResults){
					console.log('Error ' + queryResults);
				})
		};

	}]);