var icon= angular.module('WeatherApp',["ngRoute","mobile-angular-ui"]);
icon.config(['$routeProvider',function($routeProvider){
$routeProvider.when('/',{
templateUrl: 'home.html'
//controller: 'immCtrl'    
                    });
}]);
