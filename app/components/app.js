var app = angular.module('GoalTracker', ['ui.router','Home','Goals']);

app.controller('MainCtrl', [
'$scope',
function($scope){
  $scope.test = 'Hello Pie!';
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
      //,controller: 'homeCtrl'
    }).state('createGoal', {
      url: '/createGoal',
      templateUrl: 'components/goals/partial-create-goal.html'
      //,controller: 'homeCtrl'
    });

  $urlRouterProvider.otherwise('home');

}]);