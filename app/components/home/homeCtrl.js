angular.module('Home', ['HomeService']).controller('homeCtrl', ['$scope', 'goalService', function($scope, goalService) {
  
	$scope.goals = [];


	goalService.getGoals().success(function(data){
		$scope.goals = data;
		//console.log(data);
	});

}]);