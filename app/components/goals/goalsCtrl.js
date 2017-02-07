var app = angular.module('Goals', []);


app.controller('viewGoalCtrl', ['$scope','$http','$stateParams','$state', 'goalService', function($scope,$http,$stateParams,$state,goalService) {

  $scope.goal = {};

  goalService.getGoal($stateParams.goal_id).success(function(data){
		$scope.goal = data;
	});

}]);


app.controller('createGoalCtrl', ['$scope','goalService', '$state', function($scope, goalService, $state) {

  $scope.goal = {
    milestones:[{
      completeDate: new Date(),
      percentage: 100
    }]
  };

  $scope.goal.completeDate = new Date();

  $scope.createGoal = function(){

    goalService.createGoal($scope.goal).success(function(data){
      console.log(data);
      $state.go('home', {});
    });

  }

  $scope.addMilestone = function(){
    $scope.goal.milestones.push({
      completeDate: new Date(),
      percentage: 100
    });
  }

  //remove milestone from ui
   $scope.deleteMilestone = function(idx){
    $scope.goal.milestones.splice(idx, 1);
	}

}]);


app.controller('editGoalCtrl', ['$scope','$http','$stateParams','$state', 'goalService', function($scope,$http,$stateParams,$state,goalService) {

  $scope.goal = {};

  goalService.getGoal($stateParams.goal_id).success(function(data){
		$scope.goal = data;
	});

  $scope.editGoal = function(){

    goalService.editGoal($stateParams.goal_id, $scope.goal).success(function(data){
      console.log(data);
      $state.go('home', {});
    });

  }

  $scope.addMilestone = function(){
    $scope.goal.milestones.push({
      completeDate: new Date(),
      percentage: 100
    });
  }


  $scope.deleteMilestone = function(goal_id, milestone_id, idx){

    //remove milestone from ui
    $scope.goal.milestones.splice(idx, 1);

    //if this is an existing milestone delete from db
    if(milestone_id){
      goalService.deleteMilestone(goal_id, milestone_id).success(function(data){
        console.log(data);
		  });
    }

	}

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
});