var app= angular.module('WeatherApp.controllers.Main', [  'ngRoute',
  'mobile-angular-ui','ui.bootstrap']);

app.controller('MainController',['$scope',function($scope){
                                                        
}]);

app.controller('homeController', function ($scope, $modal, $log) {

 
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
