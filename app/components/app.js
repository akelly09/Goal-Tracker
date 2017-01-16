var app = angular.module('GoalTracker', ['ui.router','Home']);

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
      templateUrl: 'components/home/home.html'
      ,controller: 'homeCtrl'
    });

  $urlRouterProvider.otherwise('home');
}]);