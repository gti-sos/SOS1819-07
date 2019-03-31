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

var subsidiesStats;

client.connect(err => {
    subsidiesStats = client.db("sos").collection("subsidiesStats");
    console.log("connected");
    //client.close();
});




app.use(bodyParser.json());

var port = process.env.PORT || 8080;


var newSubsidiesStats = [{
    country: "Spain",
    year: "2017",
    film: "TadeoJones2",
    subsidyReceibed: "1.260.000",
    subsidyBudgetProject: "4.500.000",
    subsidyPercentage: "28"
}, {
    country: "Spain",
    year: "2017",
    film: "PerfectosDesconocidos",
    subsidyReceibed: "800.000",
    subsidyBudgetProject: "3.502.329",
    subsidyPercentage: "22,84"
}, {
    country: "Spain",
    year: "2017",
    film: "LaLlamada",
    subsidyReceibed: "723.109,46",
    subsidyBudgetProject: "1.807.773,66",
    subsidyPercentage: "40"
}, {
    country: "Spain",
    year: "2017",
    film: "Abracadabra",
    subsidyReceibed: "1.400.000,00",
    subsidyBudgetProject: "5.200.000,00",
    subsidyPercentage: "26,92"
}, {
    country: "Spain",
    year: "2017",
    film: "TocToc",
    subsidyReceibed: "1.120.000,00",
    subsidyBudgetProject: "3.550.000,00",
    subsidyPercentage: "31,55"
}];

//DOCUMENTACIÓN

app.get("/api/v1/subsidies-stats/docs", (req, res) => {

    res.status(301).redirect("https://documenter.getpostman.com/view/6918407/S17tRo3T");

});

//LOAD INITIAL DATA /subsidiesStats

app.get("/api/v1/subsidiesStats/loadInitialData", (req, res) => {

    subsidiesStats.find({}, { projection: { _id: 0 } }).toArray((err, subsidiesStatsArray) => {

        if (subsidiesStatsArray.length == 0) {

            subsidiesStats.insert(newSubsidiesStats);
            res.sendStatus(200);
            console.log("Base de datos inicializada con: " + subsidiesStatsArray.length + "campos");

        }
        else {

            res.sendStatus(409);

        }

    });

});


//GET /subsidiesStats

app.get("/api/v1/subsidiesStats", (req, res) => {

    subsidiesStats.find({}).toArray((err, subsidiesStatsArray) => {

        if (err)
            console.log("Error: " + err);

        res.send(subsidiesStatsArray);
    });

});


// POST /subsidiesStats

app.post("/api/v1/subsidiesStats", (req, res) => {

    var newFilm = req.body;
    var film = req.body.film;


    subsidiesStats.find({ film: film }).toArray((err, subsidiesStatsArray) => {
        if (err)
            console.log(err);


        if (subsidiesStatsArray != 0) {



            res.sendStatus(409);


        }
        else if (req.body.hasOwnProperty("country") == false || req.body.hasOwnProperty("year") == false || req.body.hasOwnProperty("subsidyReceibed") == false ||
            req.body.hasOwnProperty("subsidyBudgetProject") == false || req.body.hasOwnProperty("subsidyPercentage") == false || Object.keys(newFilm).length != 6) {

            res.sendStatus(400);

        }
        else {
            subsidiesStats.insert(newFilm);
            res.sendStatus(201);
        }
    });

});


app.listen(port, () => {
    console.log("Super server ready on port " + port);
});


//c) GET /subsidiesStats/:film
app.get("/api/v1/subsidiesStats/:film", (req, res) => {

    var film = req.params.film;

    subsidiesStats.find({ film: film }).toArray((err, subsidiesStatsArray) => {

        if (err)
            console.log("Error: " + err);
        if (subsidiesStatsArray == 0) {

            res.sendStatus(404);

        }
        else {

            res.send(subsidiesStatsArray);
        }
    });


});

//d) DELETE /subsidiesStats/:film
app.delete("/api/v1/subsidiesStats/:film", (req, res) => {

    var film = req.params.film;

    subsidiesStats.find({ film: film }).toArray((err, subsidiesStatsArray) => {
        if (err)
            console.log(err);


        if (subsidiesStatsArray == 0) {

            res.sendStatus(404);

        }
        else {

            subsidiesStats.deleteOne({ film: film });
            res.sendStatus(200);

        }
    });

});

//PUT a /subsidiesStats/:film

app.put("/api/v1/subsidiesStats/:film", (req, res) => {

    var film = req.params.film;
    var UpdatedFilm = req.body;

    subsidiesStats.find({ "film": film }).toArray((err, subsidiesStatsArray) => {
        if (err)
            console.log(err);


        if (subsidiesStatsArray == 0) {

            res.sendStatus(404);

        }
        else if (req.body.hasOwnProperty("country") == false || req.body.hasOwnProperty("year") == false || req.body.hasOwnProperty("subsidyReceibed") == false ||
            req.body.hasOwnProperty("subsidyBudgetProject") == false || req.body.hasOwnProperty("subsidyPercentage") == false ||
            Object.keys(UpdatedFilm).length != 6 ||
            req.body.film != film) {

            res.sendStatus(400);

        }
        else {

            subsidiesStats.updateOne({ "film": film }, { $set: UpdatedFilm });
            res.sendStatus(200);

        }
    });
});

//DELETE ALL

app.delete("/api/v1/subsidiesStats", (req, res) => {

    subsidiesStats.remove({});

    res.sendStatus(200);

});

//POST no permitido

app.post("/api/v1/subsidiesStats/:film", (req, res) => {

    res.sendStatus(405);

});

//PUT no permitido

app.put("/api/v1/subsidiesStats/", (req, res) => {

    res.sendStatus(405);

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
    console.log("Connected!");
    earningsInterStatsApi.register(app, earningsInterStats);

});

var newEarningsInterStats = [{

    country: "Spain",
    year: 2017,
    title: "LaCordillera",
    territory: 4,
    earning: 3295221,
    territoryTotal: 7
}, {
    country: "Spain",
    year: 2017,
    title: "Neruda",
    territory: 33,
    earning: 4154241,
    territoryTotal: 34
}, {
    country: "Spain",
    year: 2017,
    title: "Ozzy",
    territory: 30,
    earning: 9616202,
    territoryTotal: 35
}, {
    country: "Spain",
    year: 2017,
    title: "LaPromesa",
    territory: 27,
    earning: 10347672,
    territoryTotal: 27
}, {
    country: "Spain",
    year: 2017,
    title: "PerfectosDesconocidos",
    territory: 1,
    earning: 141.867,
    territoryTotal: 1
}];

// GET redirect postman

app.get("/api/v1/earnings-inter-stats/docs", (req, res) => {

    res.status(301).redirect("https://documenter.getpostman.com/view/6889093/S17tRoM9");
});

// GET /earningsInterStats/loadInitialData

app.get("/api/v1/earnings-inter-stats/loadInitialData", (req, res) => {

    earningsInterStats.find({}).toArray((err, earningsInterStatsArray) => {
        if (err) {
            console.log("Error: " + err);
        }
        else {
            if (earningsInterStatsArray.length == 0) {
                earningsInterStats.insertMany(newEarningsInterStats);
                res.sendStatus(200);
                console.log("Base de datos inicializada");
            }
            else {
                console.log("La base de datos tiene: " + earningsInterStatsArray.length + " recursos");
            }
        }


    });
});

// GET /earningsInterStats/

app.get("/api/v1/earnings-inter-stats", (req, res) => {

    earningsInterStats.find({}).toArray((err, earningsInterStatsArray) => {
        if (err)
            console.log("Error: " + err);

        res.send(earningsInterStatsArray);
    });
});


// POST /earningsInterStats/

app.post("/api/v1/earnings-inter-stats", (req, res) => {

    var newEarningInterStat = req.body;
    var title = req.body.title;

    if (newEarningInterStat.length > 6 || !newEarningInterStat.country || !newEarningInterStat.year || !newEarningInterStat.title ||
        !newEarningInterStat.territory || !newEarningInterStat.earning || !newEarningInterStat.territoryTotal) {

        res.sendStatus(400);
        return;
    }

    earningsInterStats.find({ title: title }).toArray((err, earningsInterStatsArray) => {
        if (err)
            console.log("Error: " + err);
        if (earningsInterStatsArray.length != 0) {
            res.sendStatus(409);
        }
        else {
            earningsInterStats.insertOne(newEarningInterStat);
            res.sendStatus(201);

        }

    });

});

// PUT /earningsInterStats/

app.put("/api/v1/earnings-inter-stats", (req, res) => {

    res.sendStatus(405);
});



// DELETE /earningsInterStats/

app.delete("/api/v1/earnings-inter-stats", (req, res) => {

    earningsInterStats.deleteMany();
    res.sendStatus(200);
});


// GET /earningsInterStats/title

app.get("/api/v1/earnings-inter-stats/:title", (req, res) => {

    var title = req.params.title;

    earningsInterStats.find({ title: title }).toArray((err, earningsInterStatsArray) => {
        if (err) {
            console.log(err);
        }
        if (earningsInterStatsArray.length == 0) {
            res.sendStatus(404);
        }
        else {
            res.send(earningsInterStatsArray);
        }
    });
});

// POST /earningsInterStats/title

app.post("/api/v1/earnings-inter-stats/:title", (req, res) => {
    res.sendStatus(405);
});


// PUT /earningsInterStats/title

app.put("/api/v1/earnings-inter-stats/:title", (req, res) => {

    var title = req.params.title;
    var updatedFilm = req.body;
    var newEarningInterStat = req.body;


    if (newEarningInterStat.length > 6 || !newEarningInterStat.country || !newEarningInterStat.year || !newEarningInterStat.title ||
        !newEarningInterStat.territory || !newEarningInterStat.earning || !newEarningInterStat.territoryTotal || req.body.title != title) {

        res.sendStatus(400);
        return;
    }

    earningsInterStats.find({ title: title }).toArray((err, earningsInterStatsArray) => {
        if (err) {
            console.log(err);
        }
        if (earningsInterStatsArray.length == 0) {
            res.sendStatus(404);
        }
        else {
            earningsInterStats.updateOne({ title: title }, { $set: updatedFilm });
            res.sendStatus(200);
        }
    });
});


// DELETE /earningsInterStats/title

app.delete("/api/v1/earnings-inter-stats/:title", (req, res) => {

    var title = req.params.title;

    earningsInterStats.find({ title: title }).toArray((err, earningsInterStatsArray) => {
        if (err) {
            console.log(err);
        }
        if (earningsInterStatsArray.length == 0) {
            res.sendStatus(404);
        }
        else {
            earningsInterStats.deleteOne(earningsInterStatsArray[0]);
            res.sendStatus(200);
        }
    });
});
