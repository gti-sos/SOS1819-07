var express = require("express");
var bodyParser = require("body-parser");
var takingstatsApi = require("./takingstats-api");
var path = require("path");
var request = require("request");
var cors = require("cors");

var app = express();

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

app.use(allowCrossDomain);

app.use(bodyParser.json());
app.use(cors());

app.use("/", express.static(__dirname + "/public/"));

//--------------------------------------------------------------------------------------------------
//PROXY 1 Dioni , grupo 2 

var pathsProxy='/ui/v1/takingstats/proxy1';
var apiRemota = 'https://sos1819-02.herokuapp.com/api/v1/companies-stats';

app.use(pathsProxy, function(req, res) {
  console.log('Proxy : ' + apiRemota);
  req.pipe(request(apiRemota)).pipe(res);
});

//---------------------------------------------------------------------------------------------------
//PROXY 2 Dioni , grupo 9
var pathsProxy2="/ui/v1/takingstats/proxy2";
var apiRemota2 = "https://sos1819-03.herokuapp.com/api/v1/companies";

app.use(pathsProxy2, function(req, res) {
  console.log('Proxy : ' + apiRemota2);
  req.pipe(request(apiRemota2)).pipe(res);
});

//---------------------------------------------------------------------------------------------------
//PROXY 3 Dioni , estadísticas age of empires 2
var pathsProxy3 = "/ui/v1/takingstats/proxy3";
var apiRemota3 = "https://age-of-empires-2-api.herokuapp.com/api/v1/units" ;

app.use(pathsProxy3, function(req, res) {
  console.log('Proxy : ' + apiRemota3);
  req.pipe(request(apiRemota3)).pipe(res);
});

//---------------------------------------------------------------------------------------------------
//PROXY 4 Dioni , estadísticas del battlefield 4 de personas que están online en distintas plataformas
var pathsProxy4 = "/ui/v1/takingstats/proxy4";
var apiRemota4 = "http://nflarrest.com/api/v1/crime" ;

app.use(pathsProxy4, function(req, res) {
  console.log('Proxy : ' + apiRemota4);
  req.pipe(request(apiRemota4)).pipe(res);
});


//--------------------------------------------------------------------------------------------------------------
//PROXY 1 ZOILO

var paths='/ui/v1/earnings-inter-stats/proxyApi2';
var remoteAPI = 'https://sos1819-06.herokuapp.com/api/v1/uefa-country-rankings';

app.use(paths, function(req, res) {
  console.log('piped: ' + remoteAPI);
  req.pipe(request(remoteAPI)).pipe(res);
});

//PROXY 2 ZOILO

var paths2='/ui/v1/earnings-inter-stats/proxyApiExterna1';
var remoteAPI2 = 'https://www.api-football.com/demo/api/v2/leagues';

app.use(paths2, function(req, res) {
  console.log('piped: ' + remoteAPI2);
  req.pipe(request(remoteAPI2)).pipe(res);
});

//PROXY 3 ZOILO

var paths3='/ui/v1/earnings-inter-stats/proxyApi3';
var remoteAPI3 = 'https://sos1819-08.herokuapp.com/api/v1/tourists-by-countries';

app.use(paths3, function(req, res) {
  console.log('piped: ' + remoteAPI3);
  req.pipe(request(remoteAPI3)).pipe(res);
});

//--------------------------------------------------------------------------------------------------------

//PROXY 1 Manuel

var pathsG11 ='/ui/v1/subsidies-stats/proxyApiG11';
var APIG11 = 'https://sos1819-11.herokuapp.com/api/v2/public-expenditure-educations/';

app.use(pathsG11, function(req, res) {
  console.log('piped: ' + APIG11);
  req.pipe(request(APIG11)).pipe(res);
});

//--------------------------------------------------------------------------------------------------------

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(allowCrossDomain);

var port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log("Super server ready on port " + port);
});

app.use(bodyParser.json());

const BASE_PATH = "/api";








//API DIONI----------------------------------------------------------------------------
const MongoClientDioni = require("mongodb").MongoClient;
const uriDioni = "mongodb+srv://test:test@sos-lriv2.mongodb.net/sos?retryWrites=true";
const clientDioni = new MongoClientDioni(uriDioni, { useNewUrlParser: true });

var takingstats;

clientDioni.connect(err => {
    takingstats = clientDioni.db("sos1819").collection("takingstats");
    app.get(BASE_PATH+ "/v1/takingstats/loadInitialData", (req, res) => {
    takingstats.find({}).toArray((err, takingsArray) => {
        if (takingsArray.length == 0) {
            takingstats.insert(takingStats);
            res.sendStatus(200);
        }
        else {
            console.log("Base de datos inicializada con: " + takingsArray.length + " ingresos");
        }
        
    });
});
    takingstatsApi.register(app,BASE_PATH,takingstats);
});


//-----------------------------------------------------------------------------------//
//API MANUEL


const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://test:test@sos-25vks.mongodb.net/sos?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

var subsidiesStats;

var subsidiesStatsApi = require("./subsidies-stats-api");

client.connect(err => {
    subsidiesStats = client.db("sos").collection("subsidiesStats");
    console.log("connected");
    //client.close();
    subsidiesStatsApi.register(app,BASE_PATH,subsidiesStats);
    
});










//------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
//---------------------------------------API ZOILO---------------------------------------------------------------------------


const MongoClientZoilo = require("mongodb").MongoClient;
const uriZoilo = "mongodb+srv://test:test@sos1819-qyoud.mongodb.net/sos1819?retryWrites=true";
const clientZoilo = new MongoClientZoilo(uriZoilo, { useNewUrlParser: true });

var earningsInterStatsApi = require("./earnings-inter-stats-api");

var earningsInterStats;


clientZoilo.connect(err => {
    if(err)
        console.log("Error: " + err);
    earningsInterStats = clientZoilo.db("sos1819").collection("earningsInterStats");
    console.log("Zoilo database connected!");
    earningsInterStatsApi.register(app, earningsInterStats);

});

//-----------------
var takingStats = [{
    country: "Spain",
    year: 2017,
    film: "TadeoJones2",
    distributor: "PPI",
    money: 17917439,
    rank: 1,
    spectator: 3227410
}, {
    country: "Spain",
    year: 2017,
    film: "PerfectosDesconocidos",
    distributor: "UPI",
    money: 14373417,
    rank: 2,
    spectator: 2256917
}, {
    country: "Spain",
    year: 2017,
    film: "LaLlamada",
    distributor: "DEAPLANETA",
    money: 2705357,
    rank: 12,
    spectator: 483238
}, {
    country: "Spain",
    year: 2017,
    film: "LaLibreria",
    distributor: "ACONTRA",
    money: 2366547,
    rank: 13,
    spectator: 373837
}, {
    country: "Spain",
    year: 2017,
    film: "Abracadabra",
    distributor: "SONY",
    money: 1692429,
    rank: 14,
    spectator: 286093
}];
