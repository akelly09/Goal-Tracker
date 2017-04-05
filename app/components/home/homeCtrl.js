var app = angular.module('Home', ['HomeService', 'chart.js', 'angular-svg-round-progressbar'])

app.controller('homeCtrl', ['$scope', 'goalService', function($scope, goalService) {
  
	$scope.goals  = [];
	$scope.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	goalService.getGoals().success(function(data){
		$scope.goals = data;
		//console.log(data);
	});


	goalService.getCharts().success(function(charts){

		if(charts.data.length > 0){
			$scope.series = charts.series;
			$scope.data   = charts.data;
		}else{
			$scope.data   = [[-100]];
		}
		
		//console.log(data);
	});

}]);

app.config(['ChartJsProvider', function (ChartJsProvider) {	
	
	ChartJsProvider.setOptions({
		scales: {
    	yAxes: [{id: 'y-axis-1', type: 'linear', position: 'left', ticks: {min: 0, max:100}}]
    },
			legend: {
      	//display: true,
      }
	});

}])