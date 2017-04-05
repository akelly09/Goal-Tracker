var app = angular.module('Goals', []);

var createMilestone = function(){
  return {
      completeDate: new Date(),
      complete: false
    };
}


/*
 * Controller: View a goal
 */
app.controller('viewGoalCtrl', ['$scope','$http','$stateParams','$state', 'goalService', function($scope,$http,$stateParams,$state,goalService) {

  $scope.goal = {};

  goalService.getGoal($stateParams.goal_id).success(function(data){
		$scope.goal = data;
    //console.log(data);
	});

  $scope.deleteGoal = function(goal_id){

		goalService.deleteGoal(goal_id).success(function(data){
			//console.log(data);
      $state.go('home', {});
		});

	}

  $scope.milestoneChecked = function(goal_id, milestone_id){

    var milestonesCompleted = 0, milestones = $scope.goal.milestones;

    for(let milestone of milestones){
      if(milestone.id == milestone_id){
        milestone.complete = !milestone.complete;
      }
      if(milestone.complete){
        milestonesCompleted++;
      }
    }

    if(milestonesCompleted == milestones.length){
      console.log('100%');
      //console.log(milestonesCompleted);
    }
    
    goalService.editGoal(goal_id, $scope.goal).success(function(data){
      //console.log(data);
	  });

  }

}]);


/*
 * Controller: Create a goal
 */
app.controller('createGoalCtrl', ['$scope','goalService', '$state', function($scope, goalService, $state) {

  $scope.goal = {
    milestones:[createMilestone()],
    reminder: "enable",
    progress: [
        {
        currentDate: new Date(),
        percentage : 0
      }
    ]
  };

  $scope.goal.completeDate = new Date();

  $scope.createGoal = function(){

    console.log($scope.goal);

    goalService.createGoal($scope.goal).success(function(data){
      //console.log(data);
      $state.go('home', {});
    });

  }

  $scope.addMilestone = function(){
    $scope.goal.milestones.push(createMilestone());
  }

   $scope.deleteMilestone = function(idx){
    $scope.goal.milestones.splice(idx, 1);
	}

}]);


/*
 * Controller: Edit a goal
 */
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
    $scope.goal.milestones.push(createMilestone());
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