var app = angular.module('Goals', []);


app.controller('viewGoalCtrl', ['$scope','$http','$stateParams','$state', 'goalService', function($scope,$http,$stateParams,$state,goalService) {

  $scope.goal = {};

  goalService.getGoal($stateParams.goal_id).success(function(data){
		$scope.goal = data;
	});

  $scope.deleteMilestone = function(goal_id, milestone_id){

    //console.log('goal_id: ' + goal_id + " milestone_id: " + milestone_id);

		goalService.deleteMilestone(goal_id, milestone_id).success(function(data){
			alert('This milestone has been deleted');
		});

	}

}]);


app.controller('createGoalCtrl', ['$scope','goalService', function($scope,goalService) {

  $scope.goal = {
    milestones:[{}]
  };

  $scope.createGoal = function(){

    goalService.createGoal($scope.goal).success(function(data){
      alert('created a goal');
      console.log('created goal:');
      console.log(data);
    });

  }

  $scope.addMilestone = function(){
    $scope.goal.milestones.push({});
  }

}]);


app.controller('editGoalCtrl', ['$scope','$http','$stateParams','$state', 'goalService', function($scope,$http,$stateParams,$state,goalService) {

  $scope.goal = {};

  goalService.getGoal($stateParams.goal_id).success(function(data){
		$scope.goal = data;
	});

}]);


app.directive("formatDate", function(){
  return {
   require: 'ngModel',
    link: function(scope, elem, attr, modelCtrl) {
      modelCtrl.$formatters.push(function(modelValue){
        return new Date(modelValue);
      })
    }
  }
})