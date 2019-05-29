var app = angular.module("publicApp");


app.controller("IntegrationCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("IntegrationCtrl initicialized!");

    var myApi = "https://sos1819-07.herokuapp.com/api/v1/takingstats";
    var api1 = "/ui/v1/takingstats/proxy1";
    var api2 = "/ui/v1/takingstats/proxy2";
    var api3 = "/ui/v1/takingstats/proxy3";
    var api4 = "/ui/v1/takingstats/proxy4";

    var datoAux = [];
    var datoAux2 = [];
    var datoAux3 = [];

    //-------------------API del grupo 2---------------------------------
    $http.get(api1).then(function(responseApi1) {
        var i;
        for (i = 0; i < responseApi1.data.length; i++) {
            datoAux.push(responseApi1.data[i].country);
            datoAux2.push(responseApi1.data[i].employee);
        }

        Highcharts.chart('container', {
            chart: {
                type: 'bar'
            },
            title: {
                text: "Companies takings"
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

    //----------------------API del grupo 9----------------------------
    //Line graph

    var datoAux4 = [];
    $http.get(api2).then(function(response) {
        var i;
        for (i = 0; i < response.data.length; i++) {
            if (response.data[i].country && response.data[i].totalpopulation && !isNaN(response.data[i].totalpopulation))
                datoAux3.push(response.data[i].country);
                datoAux4.push(response.data[i].numberOfCompanies);
                
        }
   
    
       Highcharts.chart('bi', {

    title: {
        text: 'Number of Employees in some countries in 2016-2017'
    },

    yAxis: {
        title: {
            text: 'Number of Employees'
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            pointStart: 2014
        }
    },

    series: [{
        name: "France",
        data: [null, null, datoAux4[0], datoAux4[1],null]
    }, {
        name: "Georgia",
        data: [null, null, null, datoAux4[2],null]
    }, {
        name: 'Germany',
        data: [null, null, null, datoAux4[3],null]
    }, {
        name: 'India',
        data: [null, null, null, datoAux4[4],null]
    }, {
        name: 'Norway',
        data: [null, null, null, datoAux4[5],null]
    }, {
        name: 'Spain',
        data: [null, null, datoAux4[6], datoAux4[7],null]
    }, {
        name: 'Sweden',
        data: [null, null, null, datoAux4[8],null]
    }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }

});
    });

    //donut,bar,line
    //age of empire
  
    $http.get(api3).then(function(response) {
        let uvCharts = [];

        response.data.units.map(function(elem) {
            let name = elem.name;
            let value = elem.build_time;
            if (name && value && !isNaN(value)) // compruebo que hay name y build time y que el name no es un número
                uvCharts.push({ "name": name, "value": value });
        });

        var graphdef = {
            categories: ['uvCharts'],
            dataset: {
                'uvCharts': uvCharts,
            }
        };


        var chart = uv.chart('Donut', graphdef, {
            meta: {
                caption: 'Stats of build time of chracters at Age Of Empires II',
                hlabel: 'Years',
                vlabel: 'Number of users',
                vsublabel: 'in thousands'
            }
        });

    });

    //BAR , LINE , DONUT , PIE
     $http.get(api4).then(function(response) {
     let uvCharts = [];
        response.data.forEach(function(elem) { 
            if(elem.arrest_count>15){ // cojo los arrestos mayores de 15
            let name = elem.Category;
            let value = elem.arrest_count;
                uvCharts.push({ "name": name, "value": value });
            }
        });

        var graphdef = {
            categories: ['uvCharts'],
            dataset: {
                'uvCharts': uvCharts,
            }
        };


        var chart = uv.chart('Pie', graphdef, {
            meta: {
                caption: 'Stats of arrests in the NFL League history up to 15',
                hlabel: 'Years',
                vlabel: 'Number of users',
                vsublabel: 'in thousands'
            }
        });


    });
     
}]);
