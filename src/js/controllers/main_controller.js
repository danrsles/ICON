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

var diseaseCol = ['Diphtheria', 'Tetanus', 'Pertussis', 'Poliomyelitis', 'Invasive haemophilus influenzae disease', 'Pneumococcal disease', 'Rotavirus enteritis',
                        'Measles', 'Mumps', 'Rubella', 'Varicella', 'Meningococcal disease', 'Type B viral hepatitis', 'Human papilloma virus infection', 'Influenza', 'Type A viral hepatitis'];
 
var vaccineNames = ['Diphtheria', 'Tetanus', 'Pertussis', 'Polio', 'Hib', 'Pneomococcal', 'Rotavirus', 'Measles', 'Mumps', 'Rubella', 'Varicella', 'Meningococcal', 'Hepatitis B', 'HPV', 'Influenza', 'Hepatitis A'];
 
var colNames = ['Date', 'Vaccine Brand', 'Diphtheria', 'Tetanus', 'Pertussis', 'Poliomyelitis', 'Invasive haemophilus influenzae disease', 'Pneumococcal disease', 'Rotavirus enteritis',
                        'Measles', 'Mumps', 'Rubella', 'Varicella', 'Meningococcal disease', 'Type B viral hepatitis', 'Human papilloma virus infection', 'Influenza', 'Type A viral hepatitis', 'Other', 'Lot Number', 'Transcribed', 'Provider'];
 
app.controller('MainController',function($scope,connect){
 $scope.bar={max:100, value: 0};
$scope.$watch(connect.get,function(v){
$scope.bar.value=v;
              });
    
});

app.controller('homeController', function ($scope, $modal,$http, $log,connect) {
$scope.cities= ['Toronto']
$scope.dem={done:false, pass:false, health:'', fname:'',mname:'',lname:'',gender:'',day:'',addressType:'',unumber:'',city:'',poCode:'',SubmitterFN:'',SubmitterLN:'',sr:'',SubmitterPhoneNumber:'',sEA:'',STN:'',RPO:'',Ruralroute:''};    
$scope.imm={done:false};
$scope.poCode=""; 
$scope.$watchCollection("[dem.health,dem.fname]", function(newValue, oldValue) {
	  $scope.getArray = [{a:$scope.dem.fname , b:$scope.dem.health}, {a:3, b:4}];
  });    
$scope.check= function(){    
    var number= $('#defaultReal').realperson('getHash');
  console.log(number);
  
;};
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

// yellow card input
   var i= 0;
                $scope.vaccList = vaccineNames;
                $scope.diseaseCol = diseaseCol;
 
                $scope.diseases= [{'entry':[
        {'name': 'Diphtheria' },
        { 'name':'Tetanus'},
        { 'name':'Pertussis' },
        {'name': 'Poliomyelitis'},
        {'name':'Invasive haemophilus influenzae disease' },
        {'name':'Pneumococcal disease' },
                                { 'name':'Rotavirus enteritis'},
        {'name':'Measles'},
        {'name':'Mumps' },
        {'name':'Rubella' },
        {'name':'Varicella' },
                                {'name':'Meningococcal disease' },
        {'name':'Type B viral hepatitis' },
        {'name':'Human papilloma virus infection' },
        {'name':'Influenza' },
        {'name':'Type A viral hepatitis' }
    ]}];
               
 
 
                $scope.records=[{'Date':'dsfad','Vaccine':'','diseaseCol':$scope.diseases[0],'OtherDetails':''}];
                $scope.add= function(){
               
                var n= 'next'+i;
                var p= {'entry':[{'name': 'Diphtheria' },
        { 'name':'Tetanus'},
        { 'name':'Pertussis' },
        {'name': 'Poliomyelitis'},
        {'name':'Invasive haemophilus influenzae disease' },
        {'name':'Pneumococcal disease' },
                                { 'name':'Rotavirus enteritis'},
        {'name':'Measles'},
        {'name':'Mumps' },
        {'name':'Rubella' },
        {'name':'Varicella' },
                                {'name':'Meningococcal disease' },
        {'name':'Type B viral hepatitis' },
        {'name':'Human papilloma virus infection' },
        {'name':'Influenza' },
        {'name':'Type A viral hepatitis' }]}
                                $scope.diseases.push(p);
                $scope.records.push({'Date':'dsfad','Vaccine':'','diseaseCol':$scope.diseases[$scope.diseases.length],'OtherDetails':'','id':''+i});
i=i+1;
 
                }
 
$scope.delete=function(id){
                var index = -1;                  
                                for( var i = 0; i < $scope.records.length; i++ ) {
                                                if( $scope.records[i].id === id) {
                                                                index = i;
                                                                break;
                                                }
                                }
                                if( index === -1 ) {
                                                alert( "Something gone wrong" );
                                }
                                $scope.records.splice( index, 1 );
        $scope.diseases.splice( index, 1);                    
                };
                

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
    
    $scope.pload= function(){        
$scope.payload=[{"data":"ICON","infoSrce":"email report",
"patient":{"hcn":$scope.dem.health,"fName":$scope.dem.fname,"mName":$scope.dem.mname,"lName":$scope.dem.lname,"email":$scope.dem.sEA,"phoneNumberType":$scope.dem.SubmitterPhoneNumberType, "phone":$scope.dem.SubmitterPhoneNumber, "phoneNumberType2":$scope.dem.SubmitterPhoneNumberType2, "phone2":$scope.dem.SubmitterPhoneNumber2,"gender":$scope.dem.gender,"dob":$scope.dem.day,"uNo":$scope.dem.unumber,"sNo":$scope.dem.stnumber,"sName":$scope.dem.stname,"city":$scope.dem.city,"pCode":$scope.dem.poCode,
"relation":{"relationship":$scope.dem.sr,"fName":$scope.dem.SubmitterPhoneNumberType,"lName":$scope.dem.SubmitterLN}},
"immunization":[{"date":"","agent":"","lotNo":"","site":"","location":"","disease":""}],"recaptcha":document.getElementById("g-recaptcha-response").value
}];
  for(var h = 0; h <$scope.sums.length; h++)
  { var a=$scope.sums[h].Agent;
    var b=$scope.sums[h].Date;
    var c=$scope.sums[h].Provider;
    var d=$scope.sums[h].LotNumber;
    $scope.payload[0].immunization[h]={"date":b,"agent":a,"lotNo":d,"provider":c, "disease":""};
  }
  console.log($scope.payload);
  document.getElementById("json").innerHTML = "Successfully loaded!"
alert("Has loaded"+$scope.payload.length);
        $http.post("http://captchaserver.mybluemix.net/captcha/",{obj:$scope.payload}).success(function(data,headers,config){}).
           error(function(data,headers,config){});

    };
function send($scope){
var data;
    var dataToSend = $scope.payload;
    console.log('the payload is: '+$scope.payload);

           
           }
/*
method: "POST",
//    async: false,
    url: "http://irfhir.mybluemix.net/rest/fhir/receipt/",     
    data: dataToSend,
    headers: 'Content-Type : application/json',
        }).success(
    console.log(console.log("HEY!"))
    );


   /* $scope.sums.push({'Agent':''+$scope.info.imm,'Date':''+$filter('date')($scope.info.day),'Provider':''+$scope.info.provider,'LotNumber':''+$scope.info.lotNumber});*/

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
      if($scope.sums[0].Agent==""){
      $scope.sums[0]= {'Agent':''+$scope.info.imm,'Date':''+$filter('date')($scope.info.day),'Provider':''+$scope.info.provider,'LotNumber':''+$scope.info.lotNumber};
      }
      else{
$scope.sums.push({'Agent':''+$scope.info.imm,'Date':''+$filter('date')($scope.info.day),'Provider':''+$scope.info.provider,'LotNumber':''+$scope.info.lotNumber});
      }
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
        };                                                            

 $scope.open = function($event) {
    $scope.opened = true;
  };
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});


 
