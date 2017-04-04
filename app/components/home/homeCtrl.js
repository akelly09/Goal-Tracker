var app = angular.module('Home', ['HomeService', 'chart.js', 'angular-svg-round-progressbar'])

app.controller('homeCtrl', ['$scope', 'goalService', function($scope, goalService) {
  
	$scope.goals = [];

	goalService.getGoals().success(function(data){
		$scope.goals = data;
	});

	
  $scope.series = ['Goal 1', 'Goal 2'];
	$scope.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	//$scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', '*December'];

  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40, 65, 59, 80],
    [28, 48, 40, 19, 86, 27, 90, 28, 48, 40, 19, 86]
  ];

  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };

	var data = [];

	data.push([1,2,3,4,5]);
	data.push([3,21,32]);

	$scope.data = data;

	//console.log(data);

}]);

//charts
// Optional configuration
/*
app.config(['ChartJsProvider', function (ChartJsProvider) {
	// Configure all charts
	ChartJsProvider.setOptions({
		chartColors: ['#FF5252', '#FF8A80'],
		responsive: false
	});
	// Configure all line charts
	ChartJsProvider.setOptions('line', {
		showLines: false
	});
}]);
*/