/* global angular */

angular.module("publicApp").controller("EditCtrl", ["$scope", "$http", "$routeParams", "$location", function ($scope, $http, $routeParams, $location){
                
                
                
                
                    console.log("Modular ListCtrl initialized!");
                    var API = "https://sos1819-07.herokuapp.com/api/v2/subsidies-stats";
                    
                    var film = $routeParams.film;
                    
                    console.log("PELICULA===="+film);
                    
                    console.log("Requesting films to <"+API+"/"+film+">...");
                    
                    
                    
                    
                    $http.get(API+"/"+film).then(function (response){
                        
                        $scope.filmToUpdate = response.data;
                        
                    });
                    
                   console.log(film);
                   
                   $scope.updateFilm = function (film){
                        
                       try{ 
                        
                        $http.put(API + "/" +film, $scope.filmToUpdate).then(function (response){
                            alert("Película modificada con exito");
                        $location.path("/ui/v1/subsidies-stats");
                        
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
                    
                   
                    
                    
                    
                    
                  
            }] );