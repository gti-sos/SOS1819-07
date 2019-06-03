var app = angular.module("publicApp");


app.controller("GraficaCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("GraficaCtrl initicialized!");
    var datoAux = [];
    var datoAux2 = [];
    var datoAux3 = [];

    var API = "https://sos1819-07.herokuapp.com/api/v1/takingStats";

    $http.get(API).then(function(response) {
        var i;
        for (i = 0; i < response.data.length; i++) {
            datoAux.push(response.data[i].film);
            datoAux2.push(response.data[i].money);
        }

        Highcharts.chart('container', {
            chart: {
                type: 'bar'
            },
            title: {
                text: "Takings stats in Spain at 2017"
            },
            xAxis: {
                categories: datoAux,
                title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Money (millions)',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: ' millions'
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -40,
                y: 80,
                floating: true,
                borderWidth: 1,
                backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                shadow: true
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'Year 2017',
                data: datoAux2
            }]
        });

    });
    $http.get(API).then(function(response) {
        var i;
        for (i = 0; i < response.data.length; i++) {
            datoAux3.push(response.data[i].money);
        }
        google.charts.load('current', {
            'packages': ['geochart'],
            // Note: you will need to get a mapsApiKey for your project.
            // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
            'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
        });
        google.charts.setOnLoadCallback(drawRegionsMap);

        function drawRegionsMap() {
            var data = google.visualization.arrayToDataTable([
                ['Country', 'Takings'],
                ['Spain', datoAux3[0] + datoAux3[1] + datoAux3[2] + datoAux3[3] + datoAux3[4]],


            ]);

            var options = {};

            var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

            chart.draw(data, options);
        }
    });
    
    $http.get(API).then(function(response) {
     let uvCharts = [];
        response.data.forEach(function(elem) { 
            //if(elem.arrest_count>15){ // cojo los arrestos mayores de 15
            let name = elem.film;
            let value = elem.money;
                uvCharts.push({ "name": name, "value": value });
           // }
        });

        var graphdef = {
            categories: ['uvCharts'],
            dataset: {
                'uvCharts': uvCharts,
            }
        };


        var chart = uv.chart('Pie', graphdef, {
            meta: {
                caption: 'Takings by films in 2017 in Spain',
                hlabel: 'Years',
                vlabel: 'Number of users',
                vsublabel: 'in thousands'
            }
        });


    });
     

}]);
