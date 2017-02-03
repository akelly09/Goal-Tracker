angular.module('Home', ['HomeService']).controller('homeCtrl', ['$scope', 'goalService', function($scope, goalService) {
  
	$scope.goals = [];
	//var goal_id      = 'R5PeYRec4tjEAJxM';
	//var milestone_id = '5881753e8f92dd15f0cc0935';

	$scope.deleteGoal = function(goal_id, idx){

		$scope.goals.splice(idx, 1);

		goalService.deleteGoal(goal_id).success(function(data){
			console.log(data);
		});

	}

	/*
	goalService.deleteMilestone(goal_id, milestone_id).success(function(data){
		console.log(data);
	});
	*/
	

	/*
	goalService.insertMilestone('R5PeYRec4tjEAJxM', milestone).success(function(data){
		console.log(data);
	});
	*/

	/*
	goalService.deleteGoal('pm0V8yLxWMTM9xKo').success(function(data){
		console.log(data);
	});
	*/

	/*
	goalService.createGoal(goal).success(function(data){
		console.log(data);
	});
	*/

	goalService.getGoals().success(function(data){
		$scope.goals = data;
		//console.log(data);
	});

}]);