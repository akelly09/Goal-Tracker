var ctrl = angular.module('Goals', []);


ctrl.controller('viewGoalCtrl', ['$scope','$http','$stateParams','$state', 'goalService', function($scope,$http,$stateParams,$state,goalService) {

  $scope.goal = {};
  //console.log($stateParams.goal_id);

  goalService.getGoal($stateParams.goal_id).success(function(data){
		$scope.goal = data;
	});

}]);