/* global angular Highcharts */

angular
    .module("publicApp")
    .controller("IntegrationGrupalCtrl", ["$scope", "$http", function($scope, $http) { //$scope permite acceder a los datos, al modelo.
        //$http establece la conexión entre el navegador del usuario y el servidor (backend).

        console.log("Integration Grupal Controller initialized");

        var apiZoilo = "https://sos1819-07.herokuapp.com/api/v1/earnings-inter-stats";
        var apiManu = "https://sos1819-07.herokuapp.com/api/v2/subsidies-stats";
        var apiDioni = "https://sos1819-07.herokuapp.com/api/v1/takingstats";

        // Highcharts, integración grupal

        $http.get(apiDioni).then(function(response1) {
            $http.get(apiManu).then(function(response2) {
                $http.get(apiZoilo).then(function(response3) {
                    Highcharts.chart('container_grupal', {

                        chart: {
                            type: 'bubble',
                            plotBorderWidth: 1,
                            zoomType: 'xy'
                        },

                        legend: {
                            enabled: false
                        },

                        title: {
                            text: 'Integración Grupal'
                        },

                        xAxis: {
                            gridLineWidth: 1,
                            title: {
                                text: 'Rank'
                            },
                            labels: {
                                format: '{value}'
                            },
                            plotLines: [{
                                color: 'black',
                                dashStyle: 'dot',
                                width: 2,
                                value: 65,
                                label: {
                                    rotation: 0,
                                    y: 15,
                                    style: {
                                        fontStyle: 'italic'
                                    },
                                    text: 'Safe fat intake 65g/day'
                                },
                                zIndex: 3
                            }]
                        },

                        yAxis: {
                            startOnTick: false,
                            endOnTick: false,
                            title: {
                                text: 'Territory'
                            },
                            labels: {
                                format: '{value}'
                            },
                            maxPadding: 0.2,
                            plotLines: [{
                                color: 'black',
                                dashStyle: 'dot',
                                width: 2,
                                value: 50,
                                label: {
                                    align: 'right',
                                    style: {
                                        fontStyle: 'italic'
                                    },
                                    text: 'Safe sugar intake 50g/day',
                                    x: -10
                                },
                                zIndex: 3
                            }]
                        },

                        tooltip: {
                            useHTML: true,
                            headerFormat: '<table>',
                            pointFormat: '<tr><th colspan="2"><h3>{point.film}</h3></th></tr>' +
                                '<tr><th>Rank:</th><td>{point.x}</td></tr>' +
                                '<tr><th>Territory:</th><td>{point.y}</td></tr>' +
                                '<tr><th>subsidy Percentage:</th><td>{point.z}%</td></tr>',
                            footerFormat: '</table>',
                            followPointer: true
                        },

                        plotOptions: {
                            series: {
                                dataLabels: {
                                    enabled: true,
                                    format: '{point.name}'
                                }
                            }
                        },

                        series: [{
                            data: [
                                { x: response1.data[0].rank, y: response3.data[0].territory, z: response2.data[0].subsidyPercentage, name: response1.data[0].distributor, film: response1.data[0].film },
                                { x: response1.data[1].rank, y: response3.data[1].territory, z: response2.data[1].subsidyPercentage, name: response1.data[1].distributor, film: response1.data[1].film },
                                { x: response1.data[2].rank, y: response3.data[2].territory, z: response2.data[2].subsidyPercentage, name: response1.data[2].distributor, film: response1.data[2].film },
                                { x: response1.data[3].rank, y: response3.data[3].territory, z: response2.data[3].subsidyPercentage, name: response1.data[3].distributor, film: response1.data[3].film },
                                { x: response1.data[4].rank, y: response3.data[4].territory, z: response2.data[4].subsidyPercentage, name: response1.data[4].distributor, film: response1.data[4].film }
                            ]
                        }]
                    });
                });
            });
        });


    }]);
