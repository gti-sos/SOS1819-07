  var app = angular.module("MiniPostmanApp");

  app.controller("MainCtrl", ["$scope", "$http", function($scope, $http) {
      console.log("MainCtrl initicialized!");

      var API = "https://sos1819-07.herokuapp.com/api/v1/takingStats";
      refresh();

      function refresh() {
          $http.get(API)
              .then(function(response) {
                  console.log("Data received " + JSON.stringify(response.data, null, 2));
                  $scope.takingstats = response.data;
              });
      }

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
      
       $scope.getUna = function() {
          $http
              .get(API+"/"+$scope.takingstats.film)
              .then(function(response) {
                  $scope.data = JSON.stringify(response.data, null, 2);
                  alert("Ha obtenido la película");
                  $scope.estado = response.status;
                 
              })
              .catch(function(response) { //recoje el error en caso de que haya
                  if (response.status == 404) {
                      alert("Esta película no existe");
                  }
                  $scope.estado = response.status;
                  
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

      $scope.search = function() {
          $http.get(API + "?rank=" + $scope.ranking + "").then(function(response) {

              $scope.takingstats = response.data;
              console.log("Data received: " + JSON.stringify(response.data, null, 2));

          });
      };
      
      

      //put

      $scope.putdataform = function() {
          var newTaking = $scope.newTaking;
          console.log("Updating contact: " + JSON.stringify(newTaking, null, 2));
          $http.put(API + "/" + newTaking.film, newTaking).then(function(response) {

              console.log("POST Response: " + response.status + response.statusText);
              alert("Usted ha actualizado una nueva película");
              refresh();
          }).catch(function(response) {
              if (response.status == 405) {
                  alert("Método no permitido");
              };
              if (response.status == 400) {
                  alert("Asegurese de poner bien los datos");
              }
              $scope.estado = response.status;
              refresh();
          });
      };

    
    
  }]);
  