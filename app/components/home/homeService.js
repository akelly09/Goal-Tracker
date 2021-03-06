var homeServices = angular.module('HomeService', []);

homeServices.factory('goalService', ['$http', function($http) {

  var goalService = {};

  /***Goals***/
  goalService.getGoals = function(){
    return $http.get('/api/goals');
  }

  goalService.getGoal = function(goal_id){
    return $http.get('/api/goals/' + goal_id);
  }

  goalService.createGoal = function(goal){
    return $http.post('/api/goals',goal);
  }

  goalService.deleteGoal = function(goal_id){
    return $http.delete('/api/goals/' + goal_id);
  }


  /***Milestone***/
  goalService.insertMilestone = function(goal_id, milestone){
    return $http.post('/api/goals/' + goal_id, milestone);
  }

  goalService.deleteMilestone = function(goal_id, milestone_id){
    return $http.delete('/api/goals/' + goal_id + '/' + milestone_id);
  }

  goalService.editGoal = function(goal_id, goal){
    return $http.put('/api/goals/' + goal_id, goal);
  }


  /***Charts***/
  goalService.getCharts = function(){
    return $http.get('/api/charts');
  }

  /*
  --inactive--
  goalService.toggleCheckbox = function(goal_id, milestones){
    return $http.put('/api/goals/' + goal_id, milestones);
  }
  */


  return goalService; 

}]);