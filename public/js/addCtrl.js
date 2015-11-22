var addCtrl = angular.module('addCtrl', ['geolocation', 'gservice']);
addCtrl.controller('addCtrl',['$scope', '$http','$rootScope', 'geolocation', 'gservice', function($scope, $http, $rootScope, geolocation, gservice){
	// initialize variables
	$scope.formData = {};
	var coords = {};
	var lat = 0;
	var long = 0;

	// Set initial coordinates to the center of the US
	$scope.formData.latitude = 39.500;
	$scope.formData.longitude = -98.350;
	
	// Get User's actual coordinates based on html5 at window load
	geolocation.getLocation().then(function(data) {
		// set the latitude and longitude equal to html5 coordinates
		coords = {lat:data.coords.latitude, long:data.coords.longitude};

		// Display coordinates in location textboxes rounded to three decimal points
		$scope.formData.longitude = parseFloat(coords.long).toFixed(3);
		$scope.formData.latitude = parseFloat(coords.lat).toFixed(3);

		// Dislay message confirming that the coordinated verified.
		$scope.formData.htmlverified = true;

		gservice.refresh($scope.formData.latitude, $scope.formData.longitude);
	});

	// Functions
	$rootScope.$on('clicked', function() {
		// Run the gservice function to ID coordinates
		$scope.$apply(function() {
			$scope.formData.latitude = parseFloat(gservice.clickLat).toFixed(3);
			$scope.formData.longitude = parseFloat(gservice.clickLong).toFixed(3);
			$scope.formData.htmlverified = false;
		});
	});

	// Create User from form fields
	$scope.createUser = function(){

		// Grabs all of the text box fields
		var userData = {
			username: $scope.formData.username,
			gender: $scope.formData.gender,
			age: $scope.formData.age,
			favlang: $scope.formData.favlang,
			location: [$scope.formData.longitude, $scope.formData.latitude],
			htmlverified: $scope.formData.htmlverified
		};

		// Save user data to the db
		$http.post('/api/users', userData)
			.success(function(data){

				// Clear form once complete
				$scope.formData.username = "";
				$scope.formData.gender = "";
				$scope.formData.age = "";
				$scope.formData.favlang = "";

				// refresh the map with new data
				gservice.refresh($scope.formData.latitude, $scope.formData.longitude);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

}]);