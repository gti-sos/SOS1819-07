/* global angular */

var app = angular.module("postmanuel");

app.controller("MainCtrl", ["$scope", "$http", function ($scope, $http){
                
                
                
                
                    console.log("Modular MainCtrl initialized!");
                    var API = "https://sos1819-07.herokuapp.com/api/v2/subsidies-stats";
                    var offset = 0;
                    console.log("Requesting films to <"+API+">...");
                    refresh();
                    
                    function refresh(){
                       
                    $http.get(API+"?limit=10&offset="+offset).then(function (response){
                        
                        $scope.films = response.data;
                        console.log("Data received: "+ JSON.stringify(response.data, null, 2));
                        
                    });
                    }
                    
                    $scope.url = "https://sos1819-07.herokuapp.com/api/v2/subsidies-stats/";
                    $scope.name ="LaLlamada";
                    $scope.data = '';
                    $scope.statusInfo = '';
                
                    
                    $scope.reset = function() {
                    $scope.data = '';
                    $scope.statusInfo = '';
                    };
                    
                    
                    $scope.next = function(){
                        
                        if($scope.films.length == 10){
                        offset += 10;
                        }
                        $http.get(API+"?limit=10&offset="+offset).then(function (response){
                        
                        $scope.films = response.data;
                        console.log("Data received: "+ JSON.stringify(response.data, null, 2));
                        
                    });
                        
                    };
                    
                    $scope.previous = function(){
                        
                        if(!(offset < 10)){
                        offset -= 10;
                        }
                        
                        $http.get(API+"?limit=10&offset="+offset).then(function (response){
                        
                        $scope.films = response.data;
                        console.log("Data received: "+ JSON.stringify(response.data, null, 2));
                        
                    });
                        
                    };
                    
                    //delete 
                    $scope.delete = function (film){
                        
                       
                       
                       $http.delete(API+"/"+film).then(function(response){
                           
                           $scope.films = response.data;
                           refresh();
                           alert("Película eliminada");
                       });
                         
                    };
                   
                   //delete all
                    $scope.deleteAll = function (){
                        
                       
                       
                       $http.delete(API).then(function(response){
                           
                           $scope.films = response.data;
                           
                           refresh();
                           alert("Se han borrado todos los datos");
                       });
                         
                    };
                    
                    //put
                    $scope.put = function (){
                        
                       try{ 
                        var newFilm = $scope.newFilm;
                        
                        $http.put(API + "/"+newFilm.film, newFilm).then(function (response){
                            alert("Película modificada con exito");
                        refresh();
                        console.log(JSON.stringify(response.status, null, 2) + JSON.stringify(response.data, null, 2));
                        
                    }).catch(function (response) {
                        
                        if(response.status == 404){
                            
                            alert("La película que intenta modificar no existe");
                            
                        }
                        
                        if(response.status == 400){
                            
                            alert("Para modificar una película rellene todo los campos");
                            
                        }
                        
                        
			        	console.log(JSON.stringify(response.status, null, 2) + JSON.stringify(response.data, null, 2));
			        	
			        });
                       }catch(e){
                        
                        $scope.statusInfo = '';
                        $scope.data = "there is nothing here to put...";
                    }
                    };
                    
                    //load all
                    $scope.loadAll = function (){
                        
                        try{
                        $http.get(API + "/loadInitialData").then(function (response){
                        
                        $scope.statusInfo = JSON.stringify(response.status, null, 2) + JSON.stringify(response.data, null, 2);
                        refresh();
                        alert("Se han cargado los datos iniciales");
                        
                    }).catch(function (response) {
                        
			        	window.confirm("Ya hay datos cargados");
			        });
                        }catch(e){
                        
                        window.alert("ERROR:"+ e);
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
                    
                    $scope.search = function (){
                        
                        var search = "?";
                        
                        if($scope.film){
                            
                            search += "&film=" + $scope.film;
                            $http.get(API+search).then(function (response){
                        var filmArray = [response.data];
                        
                        $scope.films = filmArray;
                        console.log("Data received: "+ JSON.stringify(response.data, null, 2));
                        console.log(response.data);
                        
                    });
                        }else{
                        
                        
                       if($scope.subsidyPercentage){
                           
                           search += "&subsidyPercentage=" + $scope.subsidyPercentage;
                           
                       }
                       if($scope.subsidyReceibed){
                           
                           search += "&subsidyReceibed=" + $scope.subsidyReceibed;
                           
                       }
                       if($scope.country){
                           
                           search += "&country=" + $scope.country;
                           
                       }
                       if($scope.year){
                           
                           search += "&year=" + $scope.year;
                           
                       }
                       
                       if($scope.subsidyBudgetProject){
                           
                           search += "&subsidyBudgetProject=" + $scope.subsidyBudgetProject;
                           
                       }
                       
                       $http.get(API+search).then(function (response){
                        
                        
                        $scope.films = response.data;
                        console.log("Data received: "+ JSON.stringify(response.data, null, 2));
                        console.log(response.data);
                        
                    });
                    }};
                    
                    
                    //post
                    $scope.post = function (){
                        
                        try{
                            var newFilm = $scope.newFilm;
                        $http.post(API, newFilm).then(function (response){
                        
                        $scope.films = response.data;
                        refresh();
                        alert("Nueva película añadida con exito");
                        
                    }).catch(function (response) {
                        
                        if(response.status==400){
			        	alert("revise que ha relleneado todos los campos correctamente");
                        }
                        if(response.status==409){
                            
                            alert("La pelicula que intenta añadir ya existe");
                        }
			        });
                        }catch(e){
                        
                        window.alert("ERROR:"+ e);
                    }
                    };
                    
                    
                    
                    
                  
            }] );