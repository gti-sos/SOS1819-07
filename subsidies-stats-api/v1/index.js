var path = "";

module.exports = function(app, BASE_PATH, subsidiesStats) {
    

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

path = BASE_PATH + "/subsidies-stats/docs";
    app.get(path, (req, res) => {

    res.status(301).redirect("https://documenter.getpostman.com/view/6918407/S17tRo3T");

});

//LOAD INITIAL DATA /subsidiesStats

path = BASE_PATH + "/subsidies-stats/loadInitialData";
app.get(path, (req, res) => {

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

path = BASE_PATH + "/subsidies-stats";
app.get(path, (req, res) => {

    subsidiesStats.find({}).toArray((err, subsidiesStatsArray) => {

        if (err)
            console.log("Error: " + err);

        res.send(subsidiesStatsArray);
    });

});


// POST /subsidiesStats

path = BASE_PATH + "/subsidies-stats";
app.post(path, (req, res) => {

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


//c) GET /subsidiesStats/:film

path = BASE_PATH + "/subsidies-stats/:film";
app.get(path, (req, res) => {

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

path = BASE_PATH + "/subsidies-stats/:film";
app.delete(path, (req, res) => {

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

path = BASE_PATH + "/subsidies-stats/:film";
app.put(path, (req, res) => {

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

path = BASE_PATH + "/subsidies-stats";
app.delete(path, (req, res) => {

    subsidiesStats.remove({});

    res.sendStatus(200);

});

//POST no permitido

path = BASE_PATH + "/subsidies-stats/:film";
app.post(path, (req, res) => {

    res.sendStatus(405);

});

//PUT no permitido

path = BASE_PATH + "/subsidies-stats/";
app.put(path, (req, res) => {

    res.sendStatus(405);

});

};