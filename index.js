var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var takingstatsApi = require("./takingstats-api");
app.use("/", express.static(__dirname + "/public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '10mb' }));
var port = process.env.PORT || 8080;


const BASE_PATH = "/api";

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

var subsidiesstatsApi = require("./subsidies-stats-api");

var subsidiesStats;

client.connect(err => {
    subsidiesStats = client.db("sos").collection("subsidiesStats");
    console.log("connected");
    //client.close();
    subsidiesstatsApi.register(app,BASE_PATH,subsidiesStats);
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