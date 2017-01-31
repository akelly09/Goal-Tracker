var app = angular.module('Goals', []);


app.controller('viewGoalCtrl', ['$scope','$http','$stateParams','$state', 'goalService', function($scope,$http,$stateParams,$state,goalService) {

  $scope.goal = {};

  goalService.getGoal($stateParams.goal_id).success(function(data){
		$scope.goal = data;
	});

}]);


app.controller('createGoalCtrl', ['$scope','goalService', function($scope,goalService) {

  $scope.goal = {
    milestones:[{}]
  };


  $scope.createGoal = function(){

    goalService.createGoal($scope.goal).success(function(data){
      console.log('created goal:');
      console.log(data);
    });

  }

  $scope.addMilestone = function(){
    $scope.goal.milestones.push({});
  }

}]);