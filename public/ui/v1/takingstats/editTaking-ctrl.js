/* global angular */

    angular
        .module("publicApp")
        .controller("EditCtrl2",
                        ["$scope",
                        "$http", 
                        "$routeParams",
                        "$location",
        function ($scope,$http,$routeParams,$location){
            console.log("Edit Controller initialized.");
            var API = "https://sos1819-07.herokuapp.com/api/v1/takingStats";

    
            var film = $routeParams.film;
            
            $http.get(API+"/"+film).then(function (response){
                console.log("Data Received: "
                                + JSON.stringify(response.data,null,2));
    
                $scope.taking = response.data;
                
            });
            
            
            //put

      $scope.putdataform = function(film) {
           console.log("Updating contact with name: "+film);
                $http
                    .put(API+"/"+film,$scope.taking)
                    .then(function (response){
                        console.log("PUT Response: " 
                                    + response.status + " "
                                    + response.data);
                        
             
          }).catch(function(response) {
              if (response.status == 405) {
                  alert("Método no permitido");
              };
              if (response.status == 400) {
                  alert("Asegurese de poner bien los datos");
              }
              $scope.estado = response.status;
              
          });
          $location.path("/ui/v1/takingstats"); //para volver
          alert("Actualizado correctamente");
          refresh();
      };

        function refresh() {
          $http.get(API)
              .then(function(response) {
                  console.log("Data received " + JSON.stringify(response.data, null, 2));
                  $scope.takingstats = response.data;
              });
      }
            
        }]);    