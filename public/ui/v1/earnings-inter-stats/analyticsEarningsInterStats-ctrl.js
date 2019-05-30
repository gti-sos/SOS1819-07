/* global angular Highcharts google anychart */

var app = angular.module("publicApp");

app.controller("AnalyticsCtrlEIS", ["$scope", "$http", function($scope, $http) {
    console.log("Analytics Controller initialized");
    var API = "https://sos1819-07.herokuapp.com/api/v1/earnings-inter-stats";

    //Highcharts

    $http.get(API).then(function(response) {

            Highcharts.chart('container', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'Recaudación internacional películas españolas, 2017'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        }
                    }
                },
                series: [{
                    name: 'Recaudación',
                    colorByPoint: true,
                    data: [
                        [response.data[0].title, response.data[0].earning],
                        [response.data[1].title, response.data[1].earning],
                        [response.data[2].title, response.data[2].earning],
                        [response.data[3].title, response.data[3].earning],
                        [response.data[4].title, response.data[4].earning]
                    ]
                }]
            });
        });

    //GeoCharts

    $http.get(API).then(function(response) {
            google.charts.load('current', {
                'packages': ['geochart'],
                // Note: you will need to get a mapsApiKey for your project.
                // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
                'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
            });
            google.charts.setOnLoadCallback(drawRegionsMap);

            function drawRegionsMap() {
                var data = google.visualization.arrayToDataTable([
                    ['Country', 'Recaudación'],
                    [response.data[0].country, response.data[0].earning],
                    [response.data[1].country, response.data[1].earning],
                    [response.data[2].country, response.data[2].earning],
                    [response.data[3].country, response.data[3].earning],
                    [response.data[4].country, response.data[4].earning]
                ]);

                var options = {};

                var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

                chart.draw(data, options);
            }
        });

    // Anychart

    $http.get(API).then(function(response) {
            anychart.onDocumentReady(function() {
                // create column chart
                var chart = anychart.column();

                // turn on chart animation
                chart.animation(true);

                // set chart title text settings
                chart.title('Recaudación internacional de películas españolas');

                // create area series with passed data
                var series = chart.column([
                    [response.data[0].title, response.data[0].earning],
                    [response.data[1].title, response.data[1].earning],
                    [response.data[2].title, response.data[2].earning],
                    [response.data[3].title, response.data[3].earning],
                    [response.data[4].title, response.data[4].earning]
                ]);

                // set series tooltip settings
                series.tooltip().titleFormat('{%X}');

                series.tooltip()
                    .position('center-top')
                    .anchor('center-bottom')
                    .offsetX(0)
                    .offsetY(5)
                    .format('{%Value}{groupsSeparator: }€');

                // set scale minimum
                chart.yScale().minimum(0);

                // set yAxis labels formatter
                chart.yAxis().labels().format('{%Value}{groupsSeparator: }€');

                // tooltips position and interactivity settings
                chart.tooltip().positionMode('point');
                chart.interactivity().hoverMode('by-x');

                // axes titles
                chart.xAxis().title('Película');
                chart.yAxis().title('Recaudación');

                // set container id for the chart
                chart.container('container_anychart');

                // initiate chart drawing
                chart.draw();
            });
        });
}]);
