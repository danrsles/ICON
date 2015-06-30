var app= angular.module('WeatherApp.controllers.Main', [  'ngRoute',
  'mobile-angular-ui']);

app.controller('MainController',['$scope',function($scope){
$scope.Agent;
$scope.Provider;
$scope.LotNumber; 
$scope.Date;
$scope.info ={imm: '',provider: '',lotNumber: '',day:'',month:0,year:0000}; 
console.log($scope.info);    
$scope.sums =[{'Agent':'','Date':'','Provider':'','LotNumber':''}];    
$scope.addAgent = function(){
$scope.sums.push({'Agent':''+$scope.info.imm,'Date':''+$scope.info.day,'Provider':''+$scope.info.provider,'LotNumber':''+$scope.info.lotNumber});

$scope.info.imm='';
$scope.info.provider='';
$scope.info.lotNumber=''; 
$scope.info.day='';
$scope.info.month='';
$scope.info.year='';    
        }                                                            
}]);

app.directive('myDirective', [function () {
    return {
        restrict: 'E',
        templateUrl: 'modal1.html',
        /*link: function (scope, element, attrs) {
          scope.do = function () {
            console.log('doing something...');
          }
        }*/
        controller: 'ModalController'
    };
}]);

app.controller('homeController', function ($scope, SharedState) {
    //watch model state
    $scope.$watch(function () {
        return SharedState.get('event');
    }, function (newValue) {
        console.log('event changed to ' + newValue);
    });
});

app.controller('ModalController',function($scope)
{
               
               
               
               
               
            });