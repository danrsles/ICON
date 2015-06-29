angular.module('WeatherApp.controllers.Main', [  'ngRoute',
  'mobile-angular-ui'])

.controller('MainController',['$scope',function($scope){
$scope.Agent;
$scope.Provider;
$scope.LotNumber; 
$scope.Date;
$scope.info ={imm: '',provider: '',lotNumber: '',day:0,month:0,year:0000}; 
console.log($scope.info);    
$scope.sums =[{'Agent':'','Date':'','Provider':'','LotNumber':''}];    
$scope.addAgent = function(){
$scope.sums.push({'Agent':''+$scope.info.imm,'Date':''+$scope.info.day+'/'+$scope.info.month+'/'+$scope.info.year,'Provider':''+$scope.info.provider,'LotNumber':''+$scope.info.lotNumber});

$scope.info.imm='';
$scope.info.provider='';
$scope.info.lotNumber=''; 
$scope.info.day='';
$scope.info.month='';
$scope.info.year='';    
        }    
}]);