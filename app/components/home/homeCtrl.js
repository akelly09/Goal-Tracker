angular.module('Home', ['HomeService']).controller('homeCtrl', ['$scope', 'goalService', function($scope, goalService) {
  
	$scope.goals = [];

	var goal = {
		title: 'Learn Japanese',
		completeDate: new Date(),
		milestones: []
	};

	var milestone = {
		title:"Read ch.1 of book",
		percentage:50,
		completeDate:new Date()
	};

	goalService.insertMilestone('R5PeYRec4tjEAJxM', milestone).success(function(data){
		console.log(data);
	});

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

	/*
	goalService.getGoals().success(function(data){
		$scope.goals = data;
		//console.log(data);
	});
	*/

}]);