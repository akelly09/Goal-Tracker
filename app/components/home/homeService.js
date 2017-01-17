var homeServices = angular.module('HomeService', []);

homeServices.factory('goalService', ['$http', function($http) {

  var goalService = {};

  goalService.getGoals = function(){
    return $http.get('/api/goals');
  }

  goalService.createGoal = function(){}

  goalService.deleteGoal = function(){}

  goalService.createMilestone = function(){}

  goalService.deleteMilestone = function(){}


  return goalService; 

}]);