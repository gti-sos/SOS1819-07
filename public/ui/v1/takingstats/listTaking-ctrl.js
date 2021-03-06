var app = angular.module("publicApp");

  app.controller("ListCtrl2", ["$scope", "$http", function($scope, $http) {
      console.log("ListCtrl initicialized!");
       
      var API = "https://sos1819-07.herokuapp.com/api/v1/takingStats";
      
      refresh();

      function refresh() {
          $http.get(API)
              .then(function(response) {
                  console.log("Data received " + JSON.stringify(response.data, null, 2));
                  $scope.takingstats = response.data;
              });
      }
      
     //búsqueda
    $scope.busqueda = function() {
          $http.get(API + "?" + $scope.valor + "=" + $scope.valor2).then(function(response) {
                if(response.data.length>1){
                   $scope.takingstats = response.data; 
                   console.log("Data received: " + JSON.stringify(response.data, null, 2));
                }else{
                    //Como va a devolver un objeto en la base de datos , lo que hago es pasarlo a array de un elemento
                    //ya que response.data es una array por defecto
                    $scope.takingstats = [response.data];
                    console.log("Data received: " + JSON.stringify(response.data, null, 2));
                }
          }).catch(function(response) {
              if (response.status == 404) {
                  alert("Película no encontradas para dichos " + $scope.valor);
              };
             
              $scope.estado = response.status;
              
          });;
      };
      //get

      $scope.send = function() {
          $http
              .get(API)
              .then(function(response) {
                  $scope.data = JSON.stringify(response.data, null, 2);
                  alert("Ha obtenido todas las películas");
                  $scope.estado = response.status;
                  refresh();
              })
              .catch(function(response) { //recoje el error en caso de que haya
                  if (response.status == 404) {
                      alert("Esta película no existe");
                  }
                  $scope.estado = response.status;
                  refresh();
              });

      };
      
    

      
     

      //post
      $scope.addData = function() {
          var newTaking = $scope.newTaking;
          console.log("Adding contact: " + JSON.stringify(newTaking, null, 2));
          $http.post(API, newTaking).then(function(response) {

              console.log("POST Response: " + response.status + response.statusText);
              alert("Usted ha añadido una nueva película");
              refresh();
          }).catch(function(response) {
              if (response.status == 409) {
                  alert("Esta película ya existe");
              };
              if (response.status == 400) {
                  alert("Asegurese de poner bien los datos");
              }
              $scope.estado = response.status;
              refresh();
          });
      };

      $scope.deleteFilm = function(film) {
          console.log("Delete taking: " + film);

          $http.delete(API + "/" + film).then(function(response) {
              console.log("DELETE Response: " + response.status + response.statusText);
              alert("Usted ha borrado la película" + film);
              refresh();
          });
      };


      $scope.deletedata = function(country, year, film, distributor, money, rank, spectator) {
          var dato = {
              country: country,
              year: year,
              film: film,
              distributor: distributor,
              money: money,
              rank: rank,
              spectator: spectator

          };
          $http.delete(API, JSON.stringify(dato)).then(function(response) {
              $scope.estado = response.status;
              refresh();
              alert("Ha borrado todas las películas");
          }).catch(function(response) { //recoje el error en caso de que haya
              $scope.estado = response.status;
              refresh();
          });

      };

      //loadInitialData
      $scope.loadData = function() {

          $http.get(API + "/loadInitialData", JSON.stringify($scope.data)).then(function(response) {
              $scope.estado = response.status;
              refresh();
          }).catch(function(response) { //recoje el error en caso de que haya
              $scope.estado = response.status;

              refresh();

          });
      };

            $scope.paginacion = function() {
                    console.log(API + "?limit=" + $scope.limit + "&offset=" + $scope.offset);
                    $http.get(API + "?limit=" + $scope.limit + "&offset=" + $scope.offset).then(function(response) {
                        $scope.status = "Paginación realizada correctamente.";
                        $scope.takingstats = response.data;
                        $scope.error = "";
                        console.log("Paginación Response: " + response.status + " " + JSON.stringify(response.data,null,2));
                    });
                };
                
                $scope.paginaAnterior = function() {
                    $scope.offset = $scope.offset - $scope.limit;
                    $http.get(API + "?limit=" + $scope.limit + "&offset=" + $scope.offset).then(function(response) {
                        $scope.status = "Paginación realizada correctamente.";
                        $scope.takingstats = response.data;
                        $scope.error = "";
                    });
                };
        
                $scope.paginaSiguiente = function() {
                    $scope.offset = $scope.offset + $scope.limit;
                    $http.get(API + "?limit=" + $scope.limit + "&offset=" + $scope.offset).then(function(response) {
                        $scope.status = "Paginación realizada correctamente.";
                        $scope.takingstats = response.data;
                        $scope.error = "";
                    });
                };
                
                
                
                
    
    
  }]);
  
  
  
  
            
  