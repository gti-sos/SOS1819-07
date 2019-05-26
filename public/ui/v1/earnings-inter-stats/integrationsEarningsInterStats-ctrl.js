/* global angular anychart Highcharts */

angular
    .module("publicApp")
    .controller("IntegrationCtrlEIS", ["$scope", "$http", function($scope, $http) { //$scope permite acceder a los datos, al modelo.
        //$http establece la conexión entre el navegador del usuario y el servidor (backend).

        console.log("Integration Controller initialized");

        var apiPropia = "https://sos1819-07.herokuapp.com/api/v1/earnings-inter-stats";
        var api2 = "/ui/v1/earnings-inter-stats/proxyApi2";
        var api3 = "/ui/v1/earnings-inter-stats/proxyApi3";
        var apiExterna1 = "/ui/v1/earnings-inter-stats/proxyApiExterna1";
        var apiExterna2 = "https://api.coindesk.com/v1/bpi/currentprice.json";

        // Highcharts, integración 1

        $http.get(apiPropia).then(function(response1) {
            $http.get(api3).then(function(response2) {
                Highcharts.chart('container_highcharts', {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: 'Integración 1'
                    },
                    xAxis: {
                        categories: [
                            [response2.data[0].country],
                            [response2.data[1].country],
                            [response2.data[2].country],
                            [response2.data[3].country],
                            [response2.data[4].country]
                        ],
                        crosshair: true
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Recaudación (€)'
                        }
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.categories} </td>' +
                            '<td style="padding:0"><b>{point.y:1f}€ </b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true
                    },
                    plotOptions: {
                        column: {
                            pointPadding: 0.2,
                            borderWidth: 0
                        }
                    },
                    series: [{
                        name: 'Serie 1',
                        data: [
                            [response1.data[0].earning],
                            [response1.data[1].earning],
                            [response1.data[2].earning],
                            [response1.data[3].earning],
                            [response1.data[4].earning]
                        ]

                    }]
                });
            });
        });

        // Anychart, integración 2

        $http.get(apiPropia).then(function(response1) {
            $http.get(api2).then(function(response2) {
                anychart.onDocumentReady(function() {
                    // create pie chart with passed data
                    var data = anychart.data.set([
                        [response1.data[0].title, response2.data[0].points],
                        [response1.data[1].title, response2.data[1].points],
                        [response1.data[2].title, response2.data[2].points],
                        [response1.data[3].title, response2.data[3].points],
                        [response1.data[4].title, response2.data[4].points]
                    ]);

                    var wealth = data.mapAs({ 'x': 0, 'value': 1 });

                    var chart = anychart.pie(wealth);
                    chart.labels()
                        .hAlign('center')
                        .position('outside')
                        .format('{%Value} points');

                    // set chart title text settings
                    chart.title('Integración 2');

                    // set legend title text settings
                    chart.legend()
                        // set legend position and items layout
                        .position('center-bottom')
                        .itemsLayout('horizontal')
                        .align('center');

                    // set container id for the chart
                    chart.container('container_anychart');
                    // initiate chart drawing
                    chart.draw();
                });
            });
        });

        // Highcharts, integración 3 (api externa 1)

        $http.get(apiExterna1).then(function(response1) {
            $http.get(apiPropia).then(function(response2) {
                Highcharts.chart('container_highcharts2', {
                    chart: {
                        type: 'scatter',
                        zoomType: 'xy'
                    },
                    title: {
                        text: 'Integración 3 (Api Externa 1)'
                    },
                    xAxis: {
                        title: {
                            enabled: true,
                            text: 'Territorios'
                        },
                        startOnTick: true,
                        endOnTick: true,
                        showLastLabel: true
                    },
                    yAxis: {
                        title: {
                            text: 'Id ligas / standings'
                        }
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'left',
                        verticalAlign: 'top',
                        x: 100,
                        y: 70,
                        floating: true,
                        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
                        borderWidth: 1
                    },
                    plotOptions: {
                        scatter: {
                            marker: {
                                radius: 5,
                                states: {
                                    hover: {
                                        enabled: true,
                                        lineColor: 'rgb(100,100,100)'
                                    }
                                }
                            },
                            states: {
                                hover: {
                                    marker: {
                                        enabled: false
                                    }
                                }
                            },
                            tooltip: {
                                headerFormat: '<b>{series.name}</b><br>',
                                pointFormat: '{point.x} territorios, id/standings {point.y}'
                            }
                        }
                    },
                    series: [{
                        name: 'Serie 1',
                        color: 'rgba(223, 83, 83, .5)',
                        data: [
                            [response2.data[0].territory, response1.data.api.leagues[0].league_id],
                            [response2.data[1].territory, response1.data.api.leagues[1].league_id],
                            [response2.data[2].territory, response1.data.api.leagues[2].league_id],
                            [response2.data[3].territory, response1.data.api.leagues[3].league_id]
                        ]

                    }, {
                        name: 'Serie 2',
                        color: 'rgba(119, 152, 191, .5)',
                        data: [
                            [response2.data[0].territoryTotal, response1.data.api.leagues[0].standings],
                            [response2.data[1].territoryTotal, response1.data.api.leagues[1].standings],
                            [response2.data[2].territoryTotal, response1.data.api.leagues[2].standings],
                            [response2.data[3].territoryTotal, response1.data.api.leagues[3].standings]
                        ]
                    }]
                });
            });
        });

        // Anychart, integración 4 (api externa 2)

        $http.get(apiExterna2).then(function(response1) {
            $http.get(apiPropia).then(function(response2) {
                anychart.onDocumentReady(function() {
                    // create pie chart with passed data
                    var chart = anychart.pie([
                        [response1.data.bpi.USD.description, response2.data[0].territoryTotal],
                        [response1.data.bpi.GBP.description, response2.data[1].territoryTotal],
                        [response1.data.bpi.EUR.description, response2.data[2].territoryTotal]
                    ]);

                    // set chart title text settings
                    chart.title('Integración 4 (Api Externa 2)')
                        //set chart radius
                        .radius('43%')
                        // create empty area in pie chart
                        .innerRadius('30%');

                    // set container id for the chart
                    chart.container('container_anychart2');
                    // initiate chart drawing
                    chart.draw();
                });
            });
        });

    }]);
