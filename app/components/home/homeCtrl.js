var app = angular.module('Home', ['HomeService'])

app.controller('homeCtrl', ['$scope', 'goalService', function($scope, goalService) {
  
	$scope.goals = [];

	$scope.deleteGoal = function(goal_id, idx){

		$scope.goals.splice(idx, 1);

		goalService.deleteGoal(goal_id).success(function(data){
			console.log(data);
		});

	}

	goalService.getGoals().success(function(data){
		$scope.goals = data;
	});

}]);