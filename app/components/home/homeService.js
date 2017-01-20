var homeServices = angular.module('HomeService', []);

homeServices.factory('goalService', ['$http', function($http) {

  var goalService = {};

  goalService.getGoals = function(){
    return $http.get('/api/goals');
  }

  goalService.createGoal = function(goal){
    return $http.post('/api/goals',goal);
  }

  goalService.deleteGoal = function(goal_id){
    return $http.delete('/api/goals/' + goal_id);
  }

  goalService.insertMilestone = function(goal_id, milestone){
    return $http.post('/api/goals/' + goal_id, milestone);
  }

  goalService.deleteMilestone = function(goal_id, milestone_id){
    return $http.delete('/api/goals/' + goal_id + '/' + milestone_id);
  }


  return goalService; 

}]);