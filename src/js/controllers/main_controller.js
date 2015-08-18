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
 
var vaccineNames = ['Diphtheria', 'Tetanus', 'Pertussis', 'Polio','IPV','OPV', 'Hib', 'Pneomococcal', 'PneumoConjugate','Pneumo Poly','Rotavirus', 'Measles', 'Mumps', 'Rubella', 'Varicella', 'Meningococcal','Men-Conjugate C','Men-Conjugate ACYW', 'Hepatitis B', 'HPV', 'Influenza', 'Hepatitis A'];
 
var colNames = ['Date', 'Vaccine Brand', 'Diphtheria', 'Tetanus', 'Pertussis', 'Poliomyelitis', 'Invasive haemophilus influenzae disease', 'Pneumococcal disease', 'Rotavirus enteritis',
                        'Measles', 'Mumps', 'Rubella', 'Varicella', 'Meningococcal disease', 'Type B viral hepatitis', 'Human papilloma virus infection', 'Influenza', 'Type A viral hepatitis', 'Other', 'Lot Number', 'Transcribed', 'Provider'];
 
app.controller('MainController',function($scope,connect){
 $scope.bar={max:100, value: 0};
$scope.$watch(connect.get,function(v){
$scope.bar.value=v;
              });
    
});

app.controller('homeController', function ($scope, $modal,$http, $log,connect) {
$scope.cities= 
$scope.getLocation = function (val){
var url=  '//cityservice.mybluemix.net/cities/canada/ontario/'+val   
return $http.get(url).then(function(response){
    var cities=[];
console.log(response);    
angular.forEach(response.data,function(item)
                {
cities.push(item)
});   
console.log(cities);    
return cities;
});
};
 
               
$scope.sts=["Abbey","Acres","Alley","Allée","Autoroute","Avenue","Avenue","Bay","Beach","Bend","Boulevard","Boulevard","By-pass","Byway","Campus","Cape","Carrefour","Carré","Centre","Centre","Cercle","Chase","Chemin","Circle","Circuit","Close","Common","Concession","Corners","Cour","Cours","Court","Cove","Crescent","Croissant","Crossing","Cul-de-sac","Côte","Dale","Dell","Diversion","Downs","Drive","Driveway","End","Esplanade","Estates","Expressway","Extension","Farm","Field","Forest","Freeway","Front","Gardens","Gate","Glade","Glen","Green","Grounds","Grove","Harbour","Heath","Heights","Highlands","Highway","Hill","Hollow","Impasse","Inlet","Island","Key","Knoll","Landing","Lane","Limits","Line","Link","Lookout","Loop","Mall","Manor","Maze","Meadow","Mews","Montée","Moor","Mount","Mountain","Orchard","Parade","Parc","Park","Parkway","Passage","Path","Pathway","Pines","Place","Place","Plateau","Plaza","Point","Pointe","Port","Private","Promenade","Quai","Quay","Ramp","Rang","Range","Ridge","Rise","Road","Rond-point","Route","Row","Rue","Ruelle","Run","Sentier","Sideroad","Square","Street","Subdivision","Terrace","Terrasse","Thicket","Towers","Townline","Trail","Turnabout","Vale","Via","View","Village","Villas","Vista","Voie","Walk","Way","Wharf","Wood","Wynd","Échangeur","Île"];
$scope.dem={done:false, pass:false, health:'', fname:'',mname:'',lname:'',gender:'',day:'',addressType:'',unumber:'',stnum:'',streetName:'',city:'',streetType:'',streetDirection:'',poBox:'',prov:'',country:'Canada',poCode:'',SubmitterFN:'',SubmitterLN:'',sr:'',SubmitterPhoneNumber:'',SubmitterPhoneNumbeType:'',sEA:'',STN:'',RPO:'',Ruralroute:''};   

    $scope.self= function (){
if($scope.dem.sr=='Self')
{
$scope.dem.SubmitterFN = $scope.dem.fname;
$scope.dem.SubmitterLN = $scope.dem.lname;    
}    
else
{
$scope.dem.SubmitterFN ="";
$scope.dem.SubmitterLN ="";    
}    
    };
$scope.status = {open:true,opentwo:false};   
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
$scope.status.open = false;    
}
else
{

}    
};
    
$scope.edit=function(){
    if($scope.myForm.$valid){
connect.give(0);
$scope.dem.done= false; 
$scope.status.open =!$scope.status.open ; }   
else{//Do nothing
}
};

$scope.mupdate=function(){
connect.give(50);
$scope.imm.done="true";
$scope.status.opentwo=false;    
}

$scope.medit=function(){
connect.give(25);
$scope.imm.done= !$scope.imm.done;    
}

$scope.dateOptions = {
formatYear: 'yy',
startingDay:1    
};

$scope.maxDate = new Date();    
    
$scope.format='yyyy-MMMM-dd';    
// yellow card input
   var i= 0;
                $scope.vaccList = vaccineNames;
                $scope.diseaseCol = diseaseCol;
    $scope.hist=[{date:''}];
    $scope.historical = [{agent:''}];
 $scope.agents=['MMR']
                $scope.diseases= [{'entry':[
        {'name': 'Diphtheria',
        'checked' : false},
        { 'name':'Tetanus',
        'checked' : false},
        { 'name':'Pertussis',
        'checked' : false },
        {'name': 'Poliomyelitis',
        'checked' : false},
      {'name': 'Poliomyelitis(IPV)',
        'checked' : false},
        {'name': 'Poliomyelitis(OPV)',
        'checked' : false},
        {'name':'Invasive haemophilus influenzae disease',
        'checked' : false},
        {'name':'Pneumococcal disease',
        'checked' : false },
        {'name':'Pneumo Conjugate disease',
        'checked' : false },
        {'name':'Pneumo Poly',
        'checked' : false },
        { 'name':'Rotavirus enteritis',
        'checked' : false},
        {'name':'Measles',
        'checked' : false},
        {'name':'Mumps',
        'checked' : false },
        {'name':'Rubella',
        'checked' : false },
        {'name':'Varicella',
        'checked' : false },
        {'name':'Meningococcal disease',
        'checked' : false },
        {'name':'Men-Conjugate C',
        'checked' : false },
        {'name':'Men-Conjugate-ACYX',
        'checked' : false },
        {'name':'Type B viral hepatitis',
        'checked' : false},
        {'name':'Human papilloma virus infection',
        'checked' : false},
        {'name':'Influenza',
        'checked' : false},
        {'name':'Type A viral hepatitis',
        'checked' : false}
    ]}];
               
 
 
                $scope.records=[{'Date':$scope.hist[0],'Vaccine':$scope.historical[0],'diseaseCol':$scope.diseases[0],'OtherDetails':''}];
                $scope.add= function(){
               
                var n= 'next'+i;
                var p= {'entry':[
        {'name': 'Diphtheria',
        'checked' : false},
        { 'name':'Tetanus',
        'checked' : false},
        { 'name':'Pertussis',
        'checked' : false },
        {'name': 'Poliomyelitis',
        'checked' : false},
      {'name': 'Poliomyelitis(IPV)',
        'checked' : false},
        {'name': 'Poliomyelitis(OPV)',
        'checked' : false},
        {'name':'Invasive haemophilus influenzae disease',
        'checked' : false},
        {'name':'Pneumococcal disease',
        'checked' : false },
        {'name':'Pneumo Conjugate disease',
        'checked' : false },
        {'name':'Pneumo Poly',
        'checked' : false },
        { 'name':'Rotavirus enteritis',
        'checked' : false},
        {'name':'Measles',
        'checked' : false},
        {'name':'Mumps',
        'checked' : false },
        {'name':'Rubella',
        'checked' : false },
        {'name':'Varicella',
        'checked' : false },
        {'name':'Meningococcal disease',
        'checked' : false },
        {'name':'Men-Conjugate C',
        'checked' : false },
        {'name':'Men-Conjugate-ACYX',
        'checked' : false },
        {'name':'Type B viral hepatitis',
        'checked' : false},
        {'name':'Human papilloma virus infection',
        'checked' : false},
        {'name':'Influenza',
        'checked' : false},
        {'name':'Type A viral hepatitis',
        'checked' : false}
                                 ]}
                
                
                $scope.historical.push({'agent':''});
                    $scope.hist.push({'date':''})
                                $scope.diseases.push(p);
   var length = $scope.diseases.length - 1;             $scope.records.push({'Date':$scope.hist[length],'Vaccine':$scope.historical[length],'diseaseCol':$scope.diseases[length],'OtherDetails':'','id':''+i});
i=i+1;
 console.log(length);
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
    $scope.hist.splice(index,1);
    $scope.historical.splice(index,1);
                };
$scope.checkdis=function(id)
{
     var index = -1;                  
                                for( var i = 0; i < $scope.records.length; i++ ) {
                                                if( $scope.records[i].id === id) {
                                                                index = i;
                                                                break;
                                                }
                                }
    console.log($scope.records[index].Vaccine);
if($scope.records[index].Vaccine.agent =='MMR')
{   $scope.records[index].diseaseCol.entry[0].checked = false;
    $scope.records[index].diseaseCol.entry[1].checked = false;
    $scope.records[index].diseaseCol.entry[2].checked = false;
    $scope.records[index].diseaseCol.entry[3].checked = false;
    $scope.records[index].diseaseCol.entry[4].checked = false;
    $scope.records[index].diseaseCol.entry[5].checked = false;
    $scope.records[index].diseaseCol.entry[6].checked = false;
    $scope.records[index].diseaseCol.entry[7].checked = false;
    $scope.records[index].diseaseCol.entry[8].checked = false;
    $scope.records[index].diseaseCol.entry[9].checked = false;
    $scope.records[index].diseaseCol.entry[10].checked = false;
    $scope.records[index].diseaseCol.entry[11].checked = true;
    $scope.records[index].diseaseCol.entry[12].checked = true;
    $scope.records[index].diseaseCol.entry[13].checked = true;
    $scope.records[index].diseaseCol.entry[14].checked = false;
    $scope.records[index].diseaseCol.entry[15].checked = false;
    $scope.records[index].diseaseCol.entry[16].checked = false;
    $scope.records[index].diseaseCol.entry[17].checked = false;
    $scope.records[index].diseaseCol.entry[18].checked = false;
    $scope.records[index].diseaseCol.entry[19].checked = false;
    $scope.records[index].diseaseCol.entry[20].checked = false;
    $scope.records[index].diseaseCol.entry[21].checked = false;

}
else{
console.log("error");
}
};
$scope.checkvac= function(id)
    {
   
      var index = -1;                  
                                for( var i = 0; i < $scope.records.length; i++ ) {
                                                if( $scope.records[i].id === id) {
                                                                index = i;
                                                                break;
                                                }
                                }
        for (var j = 0; j< 22; j++){
            
            if (j == 11){
                console.log(j)
             continue;
             }
            else if (j == 12){
                console.log(j)
             continue;
             }
             else if (j == 13){
                console.log(j)
             continue;
             }
        else if ($scope.records[index].diseaseCol.entry[j].checked == true)
        { console.log("Soorry!");
          $scope.records[index].Vaccine.agent = '';
            break;}
        else if (j == 21)
        {
        if($scope.records[index].diseaseCol.entry[11].checked == true &&
$scope.records[index].diseaseCol.entry[12].checked == true &&    
$scope.records[index].diseaseCol.entry[13].checked == true){
    {
         console.log("two");
    $scope.records[index].Vaccine.agent ='MMR'
    }
    }
                  else{
                      $scope.records[index].Vaccine.agent = '';
        console.log("not MMR")
        }
        }
        }
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
    
    $scope.pload= function(){        
$scope.payload=[{"data":"ICON","infoSrce":"email report",
"patient":{"hcn":$scope.dem.health,"fName":$scope.dem.fname,"mName":$scope.dem.mname,"lName":$scope.dem.lname,"email":$scope.dem.sEA,"phoneNumberType":$scope.dem.SubmitterPhoneNumberType, "phone":$scope.dem.SubmitterPhoneNumber, "phoneNumberType2":$scope.dem.SubmitterPhoneNumberType2, "phone2":$scope.dem.SubmitterPhoneNumber2,"gender":$scope.dem.gender,"dob":$scope.dem.day,"uNo":$scope.dem.unumber,"sNo":$scope.dem.stnumber,"addressType":$scope.dem.addressType,"Street Number":$scope.dem.stnum,"streetName":$scope.streetName,"streetType":$scope.dem.streetType,"streetDirection":$scope.dem.streetDirection,"sName":$scope.dem.stname,"city":$scope.dem.city,"pCode":$scope.dem.poCode,"STN":$scope.dem.STN,"RPO":$scope.dem.RPO,"RuralRoute":$scope.dem.Ruralroute,"Province":$scope.dem.prov,"Country":$scope.dem.country,
"relation":{"relationship":$scope.dem.sr,"fName":$scope.dem.SubmitterFN,"lName":$scope.dem.SubmitterLN}},
"immunization":[{"date":"","agent":"","snowmed":"","site":"","location":"","disease":""}],"recaptcha":document.getElementById("g-recaptcha-response").value
}];
  for(var h = 0; h <$scope.records.length; h++)
  { var a=$scope.records[h].Vaccine.agent;
    var b=$scope.records[h].Date.date;
   b=b.toISOString().substring(0,10);
    var c=$scope.records[h].diseaseCol.entry;
   var z;
    if(a =='MMR')
    {
    z=61153008
    }
    $scope.payload[0].immunization[h]={"date":b,"agent":a, "disease":c,"snowmed":z};
  }
  console.log($scope.payload);
  document.getElementById("json").innerHTML = "Successfully loaded!"
alert("Has loaded"+$scope.payload.length);
        $http.post("http://ihrsubmit.mybluemix.net/submit/icon/demo",{obj:$scope.payload}).success(function(data,headers,config){}).
           error(function(data,headers,config){});
        connect.give(100);

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
app.directive('datepickerPopup', function(){
return{
restrict: 'EAC',
require:  'ngModel',
link: function(scope,element,attr,controller){
controller.$formatters.shift();
}    
}
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



 
