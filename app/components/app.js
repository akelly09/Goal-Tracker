var app = angular.module('GoalTracker', ['ui.router','Home','Goals']);


app.controller('MainCtrl', ['$scope', '$window', '$state', function($scope, $window, $state) {

	$scope.goBack = function(){
    $window.history.back();
  }

}]);


app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'components/home/partial-home.html',
      controller: 'homeCtrl'
    }).state('viewGoal', {
      url: '/viewGoal/{goal_id}',
      templateUrl: 'components/goals/partial-view-goal.html',
      controller: 'viewGoalCtrl'
    }).state('editGoal', {
      url: '/editGoal/{goal_id}',
      templateUrl: 'components/goals/partial-edit-goal.html'
      ,controller: 'editGoalCtrl'
    }).state('createGoal', {
      url: '/createGoal',
      templateUrl: 'components/goals/partial-create-goal.html'
      ,controller: 'createGoalCtrl'
    });

  $urlRouterProvider.otherwise('home');

}]);