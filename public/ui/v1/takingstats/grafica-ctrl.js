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
        console.log(datoAux);
        console.log(datoAux2);


        Highcharts.chart('container', {
            chart: {
                type: 'bar'
            },
            title: {
                text: "Takings stats in Spain at 2017"
            },
            xAxis: {
                categories: [datoAux[0], datoAux[1], datoAux[2], datoAux[3], datoAux[4]],
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
                data: [datoAux2[0], datoAux2[1], datoAux2[2], datoAux2[3], datoAux2[4]]
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

    var chart = uv.chart ('Line', graphdef);

/*var graphdef = {
	categories : ['uvCharts', 'matisse', 'bot-bot', 'SocialByWay'],
	dataset : {
		'uvCharts' : [
			{ name : '2009', value : 32 },
			{ name : '2010', value : 60 },
			{ name : '2011', value : 97 },
			{ name : '2012', value : 560 },
			{ name : '2013', value : 999 }
		],
		
		'matisse' : [
			{ name : '2009', value : 58 },
			{ name : '2010', value : 75 },
			{ name : '2011', value : 90 },
			{ name : '2012', value : 740 },
			{ name : '2013', value : 890 }		
		],
		
		'bot-bot' : [
			{ name : '2009', value : 43 },
			{ name : '2010', value : 88 },
			{ name : '2011', value : 100 },
			{ name : '2012', value : 420 },
			{ name : '2013', value : 769 }	
		],
		
		'SocialByWay' : [
			{ name : '2009', value : 88 },
			{ name : '2010', value : 120 },
			{ name : '2011', value : 157 },
			{ name : '2012', value : 450 },
			{ name : '2013', value : 1024 }	
		],
		
		'WaveMaker' : [
			{ name : '2009', value : 32 },
			{ name : '2010', value : 60 },
			{ name : '2011', value : 97 },
			{ name : '2012', value : 560 },
			{ name : '2013', value : 999 }	
		]
	}
};*/


  


}]);
