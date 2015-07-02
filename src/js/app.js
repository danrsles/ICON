angular.module('WeatherApp', [
  'ngRoute',
  'mobile-angular-ui',
    'ui.bootstrap',
  'WeatherApp.controllers.Main'
])

.config(['$routeProvider',function ($routeProvider) {
  $routeProvider.when('/', {templateUrl:'home.html',controller: 'homeController',  reloadOnSearch: false});
  $routeProvider.otherwise({redirectTo: '/home'});
}]);
