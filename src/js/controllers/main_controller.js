var app= angular.module('WeatherApp.controllers.Main', [  'ngRoute', 'mobile-angular-ui','ui.bootstrap','ngMessages','ngSanitize', 'ngCsv']);

app.factory('connect', function(){
var bar="";
return{
give : function (x,y){
bar=x;    
},    
get : function(){
return bar;}};

});


app.controller('MainController',function($scope,connect){
 $scope.bar={max:100, value: 0};
$scope.$watch(connect.get,function(v){
$scope.bar.value=v;
              });
    
});

app.controller('homeController', function ($scope, $modal, $log,connect) {
$scope.cities= ['Toronto'];    
$scope.dem={done:false, pass:false, health:'', fname:''};
    
$scope.imm={done:false};
$scope.poCode=""; 
$scope.$watchCollection("[dem.health,dem.fname]", function(newValue, oldValue) {
	  $scope.getArray = [{a:$scope.dem.fname , b:$scope.dem.health}, {a:3, b:4}];
  });    
$scope.check= function(){    
if($scope.poCode.match(/([A-Z]\d[A-Z]\d[A-Z]\d)/)==null)
   {
    $scope.dem.pass="true";
   $scope.poCode="";
   }
else{
$scope.dem.pass="false";
}    
   };
$scope.update= function(){    
if($scope.myForm.$valid){
connect.give(25);
$scope.dem.done="true";    
}
else
{

}    
};
    
$scope.edit=function(){
connect.give(0);
$scope.dem.done= !$scope.dem.done;    
};

$scope.mupdate=function(){
connect.give(50);
$scope.imm.done="true";    
}

$scope.medit=function(){
connect.give(25);
$scope.imm.done= !$scope.imm.done;    
}

  //modal   
$scope.sucess="false";
$scope.Agent;
$scope.Provider;
$scope.LotNumber; 
$scope.Date;
$scope.info ={imm: '',provider: '',lotNumber: '',day:'',month:0,year:0,show:'false'}; 
console.log($scope.info);    
$scope.sums =[{'Agent':'','Date':'','Provider':'','LotNumber':''}];    
$scope.info ={imm: '',provider: '',lotNumber: '',day:'',month:0,year:0};
$scope.opened="false"
 $scope.items = ['item1', 'item2', 'item3'];
  $scope.open = function (size) {

    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      scope:$scope,
      windowClass: 'xx-dialog',    
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };


});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

app.controller('ModalInstanceCtrl', function ($scope, $modalInstance,items, $timeout,$filter) {
 $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };
  $scope.addAgent = function(){
$scope.sums.push({'Agent':''+$scope.info.imm,'Date':''+$filter('date')($scope.info.day),'Provider':''+$scope.info.provider,'LotNumber':''+$scope.info.lotNumber});

$scope.info.imm='';
$scope.info.provider='';
$scope.info.lotNumber=''; 
$scope.info.day='';
$scope.info.month='';
$scope.info.year=''; 
$scope.info.show='true';
$scope.opened = true;
 $modalInstance.close($scope.selected.item);
 $scope.show="false";
        }                                                            

 $scope.open = function($event) {
    $scope.opened = true;
  };
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
