/* global angular */

var app = angular.module("postmanuel");

app.controller("MainCtrl", ["$scope", "$http", function ($scope, $http){
                
                
                
                
                    console.log("Modular MainCtrl initialized!");
                    var API = "https://sos1819-07.herokuapp.com/api/v1/subsidies-stats";
                    
                    console.log("Requesting films to <"+API+">...");
                    refresh();
                    
                    function refresh(){
                       
                    $http.get(API).then(function (response){
                        
                        $scope.films = response.data;
                        console.log("Data received: "+ JSON.stringify(response.data, null, 2));
                        
                    });
                    }
                    
                    $scope.url = "https://sos1819-07.herokuapp.com/api/v1/subsidies-stats/";
                    $scope.name ="LaLlamada";
                    $scope.data = '';
                    $scope.statusInfo = '';
                
                    
                    $scope.reset = function() {
                    $scope.data = '';
                    $scope.statusInfo = '';
                    };
                    
                    //get all
                    $scope.getAll = function (){
                        
                        $http.get($scope.url).then(function (response){
                        
                        
                        $scope.data = JSON.stringify(response.data, null, 2);
                        $scope.statusInfo = JSON.stringify(response.status, null, 2);
                        
                    });
                        
                    };
                    
                    //loadInitialData
                    $scope.lid = function (){
                        
                        try{
                        $http.get($scope.url + "loadInitialData").then(function (response){
                        
                        $scope.statusInfo = JSON.stringify(response.status, null, 2) + JSON.stringify(response.data, null, 2);
                        
                    }).catch(function (response) {
                        
			        	$scope.statusInfo = JSON.stringify(response.status, null, 2) + JSON.stringify(response.data, null, 2);
			        });
                        }catch(e){
                        
                        alert(e);
                    }
                    };
                    
                    //get 
                    $scope.get = function (){
                        
                        if($scope.name == ''){
                            
                            $scope.data = "the field 'Film' is empty!!!!!!!!";
                            $scope.statusInfo = '';
                            
                        }else{
                        
                        $http.get($scope.url + $scope.name).then(function (response){
                        
                        $scope.statusInfo = JSON.stringify(response.status, null, 2);
                        $scope.data = JSON.stringify(response.data, null, 2);
                        
                    }).catch(function (response) {
                        
                        $scope.data = '';
			        	$scope.statusInfo = JSON.stringify(response.status, null, 2) + JSON.stringify(response.data, null, 2);
			        });
                        }
                    };
                    
                    //delete all
                    $scope.deleteAll = function (){
                        
                        $http.delete($scope.url).then(function (response){
                        
                        $scope.statusInfo = JSON.stringify(response.status, null, 2) + JSON.stringify(response.data, null, 2);
                        
                    }).catch(function (response) {
                        
			        	$scope.statusInfo = JSON.stringify(response.status, null, 2) + JSON.stringify(response.data, null, 2);
			        });
                        
                    };
                    
                    //delete 
                    $scope.delete = function (film){
                        
                       
                       
                       $http.delete(API+"/"+film).then(function(response){
                           
                           $scope.films = response.data;
                           refresh();
                           
                       });
                         

                    $scope.delete = function (){
                        
                        if($scope.name == ''){
                            
                            $scope.data = "the field 'Film' is empty!!!!!!!!";
                            $scope.statusInfo = '';
                            
                        }else{
                        
                        $http.delete($scope.url + $scope.name).then(function (response){
                        
                        $scope.statusInfo = JSON.stringify(response.status, null, 2) + JSON.stringify(response.data, null, 2);
                    
                            
                        }).catch(function (response) {
                            
                            $scope.data = '';
                        $scope.statusInfo = JSON.stringify(response.status, null, 2) + JSON.stringify(response.data, null, 2);
			        });
                        }   

                    };
                    
                    
                    //search
                    $scope.search = function (){
                        
                       
                       
                       $http.get(API+"?from="+$scope.subsidyPercentage1+"&to="+$scope.subsidyPercentage2+"").then(function (response){
                        
<<<<<<< HEAD
                        $scope.data = JSON.stringify(response.data, null, 2);
                        $scope.statusInfo = JSON.stringify(response.status, null, 2);
                        
                    }).catch(function (response) {
                        
			        	$scope.statusInfo = JSON.stringify(response.status, null, 2);
			        	$scope.statusInfo = JSON.stringify(response.status, null, 2);
                        //$scope.data = 
                        $scope.statusInfo = JSON.stringify(response.status, null, 2) + JSON.stringify(response.data, null, 2);
=======
                        $scope.films = response.data;
                        console.log("Data received: "+ JSON.stringify(response.data, null, 2));
>>>>>>> eccc7067010d6239725cb10a9f1405f14b36cd06
                        
                    });
                    };
                         
                    $scope.search1 = function (){
                        
                       
                       
                       $http.get(API+"?subsidyPercentage="+28).then(function (response){
                        
                        $scope.films = response.data;
                        console.log("Data received: "+ JSON.stringify(response.data, null, 2));
                        
                    });
                    };
                    
                    
                    //post
                    $scope.post = function (){
                       
                       var newFilm = $scope.newFilm;
                       $http.post(API, newFilm).then(function(response){
                           
                           $scope.films = response.data;
                           refresh();
                           
                       });
                        
                    };
                    
                    
                    //put
                    $scope.put = function (){
                        
                       try{ 
                        var data = JSON.parse($scope.data);
                        
                        
                        $http.put($scope.url + $scope.name, data).then(function (response){
                        
                        $scope.statusInfo = JSON.stringify(response.status, null, 2) + JSON.stringify(response.data, null, 2);
                        
                    }).catch(function (response) {
                        
			        	$scope.statusInfo = JSON.stringify(response.status, null, 2) + JSON.stringify(response.data, null, 2);
			        	
			        });
                       }catch(e){
                        
                        $scope.statusInfo = '';
                        $scope.data = "there is nothing here to put...";
                    }
                    };
                    
                    };
            }] );