var app = angular.module('Home', ['HomeService'])

app.controller('homeCtrl', ['$scope', 'goalService', function($scope, goalService) {
  
	$scope.goals = [];

	goalService.getGoals().success(function(data){
		$scope.goals = data;
	});

}]);