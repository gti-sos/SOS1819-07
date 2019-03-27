var express = require("express");
var bodyParser = require("body-parser");
//var mongoose = require("mongoose");
//app.use(mongoose.json());
var jwt = require('jsonwebtoken');
var app = express();

app.use("/",express.static(__dirname+"/public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '10mb' }));
var port = process.env.PORT || 8080;


//POSTMAN DIONI
app.get("/api/v1/takingstats/docs", (req, res) => {

    res.status(301).redirect("https://documenter.getpostman.com/view/3895452/S17tS8NX");

});



//API DIONI----------------------------------------------------------------------------
const MongoClientDioni = require("mongodb").MongoClient;
const uriDioni = "mongodb+srv://test:test@sos-lriv2.mongodb.net/sos?retryWrites=true";
const clientDioni = new MongoClientDioni(uriDioni, { useNewUrlParser: true });

var takingstats;

clientDioni.connect(err => {
    takingstats = clientDioni.db("sos1819").collection("takingstats");
    console.log("Connected!");
});


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

// LOAD INITIAL DATA de GET /takingstats/
app.get("/api/v1/takingstats/loadInitialData", (req, res) => {
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

//GET /takingstats
/*
app.get("/api/v1/takingstats", (req, res) => {
    takingstats.find({}).toArray((err, takingsArray) => {
        if (err) {
            console.log("Error: " + err);
        }
        else {
            res.send(takingsArray);
        }
    });

});*/


//POST /takingstats
app.post("/api/v1/takingstats", (req, res) => {
    var newTaking = req.body;
    var ok = false;

    if (!newTaking.country || !newTaking.year || !newTaking.film ||
        !newTaking.distributor || !newTaking.money || !newTaking.rank || !newTaking.spectator ||
        Object.keys(newTaking).length != 7) {
        res.sendStatus(400);
    }
    else {

        takingstats.find({}).toArray((err, takingsArray) => {
            for (var i = 0; i < takingsArray.length; i++) {

                if (takingsArray[i].country == newTaking.country &&
                    takingsArray[i].year == newTaking.year && takingsArray[i].film == newTaking.film &&
                    takingsArray[i].distributor == newTaking.distributor && takingsArray[i].money == newTaking.money &&
                    takingsArray[i].rank == newTaking.rank && takingsArray[i].spectator == newTaking.spectator) {
                    ok = true;

                }

            }


            if (ok == true) {
                res.sendStatus(409);
            }
            else {

                takingstats.insertOne(newTaking);
                res.sendStatus(201);
            }





        });
    }
});

//GET /takingstats/:film

app.get("/api/v1/takingstats/:film", (req, res) => {
    var film = req.params.film;
    var ok = false;
    takingstats.find({}).toArray((err, takingArray) => {

        if (err) {
            console.log(err);
        }
        else {
            var i;
            var lAux = [];
            for (i = 0; i < takingArray.length; i++) {
                if (takingArray[i].film == film) {
                    lAux.push(takingArray[i]);
                    ok = true;
                }
            }
            if (ok) {
                res.send(lAux[0]);
            }
            else {
                res.sendStatus(404);
            }
        }
    });


});

//DELETE /takingstats/:film
app.delete("/api/v1/takingstats/:film", (req, res) => {
    var film = req.params.film;
    var borrar = false;
    takingstats.find({}).toArray((err, takingArray) => {
        if (err) {
            console.log("Error " + err);
        }
        else {
            var i;
            for (i = 0; i < takingArray.length; i++) {
                if (takingArray[i].film == film) {
                    borrar = true;
                    takingstats.remove(takingArray[i]);
                }
            }
        }

        if (borrar == true) {
            // res.send(takingstats);
            res.sendStatus(200);
        }
        else {
            res.sendStatus(400);
        }

    });});
	
	//PUT /takingstats/:film
app.put("/api/v1/takingstats/:film/", (req, res) => {
    var id = req.params._id
    var film = req.params.film;
    var updatedFilm = req.body;
    takingstats.find({}).toArray((err, takingArray) => {
        if (err) {
            console.log(err);
        }
        if (film != updatedFilm.film || id != updatedFilm._id) {
            res.sendStatus(400);
        }
        else {
            takingstats.updateOne({ film: film }, { $set: updatedFilm });
            res.sendStatus(200);
        }

    });
});


//POST /takingstats/:film (debe de dar error)
app.post("/api/v1/takingstats/:film", (req, res) => {
    var newTaking = req.body;
    if (res.sendStatus(405)) { newTaking = []; }
});

//PUT /takingstats (debe dar error)
app.put("/api/v1/takingstats/", (req, res) => {
    var updatedFilm = req.body;
    if (res.sendStatus(405)) { updatedFilm = []; }
});

// DELETE /takingstats/
app.delete("/api/v1/takingstats", (req, res) => {
    takingstats.remove({});
    res.sendStatus(200);
});

//Búsqueda de las películas que están por encima de ranking 4 , y por orden descendente

/*app.get('/api/v1/takingStats/', function(req, res) {
    var rankAux = parseInt(req.query.rank);
    takingstats.find({ rank: { $gt: rankAux } }).sort({ rank: -1 }).toArray((err, takingArray) => {
        res.send(takingArray);
    });
});*/


//Paginación donde filtro por ranking mayor que 2 , salto los 0 primeros desde el rank 2 hasta un límite de 4 películas con 0 desplazamiento saldrán 3 películas
app.get('/api/v1/takingstats/', function(req, res) {
    var rankAux = parseInt(req.query.rank);
    var limitAux = parseInt(req.query.limit);
    var offSetAux = parseInt(req.query.offset);

    if (Number.isInteger(rankAux)) {
        if (Number.isInteger(limitAux) && Number.isInteger(offSetAux)) {
            //paginación
            takingstats.find({ "rank": { $gt: rankAux } }).skip(offSetAux).limit(limitAux).toArray((err, newArrayTaking) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.send(newArrayTaking);
                }

            });
        }
        else {
            //búsqueda
            takingstats.find({ rank: { $gt: rankAux } }).sort({ rank: -1 }).toArray((err, takingArray) => {
                res.send(takingArray);
            });
        }
    }
    else {
        takingstats.find({}).toArray((err, takingsArray) => {
            if (err) {
                console.log("Error: " + err);
            }
            else {
                res.send(takingsArray);
            }
        });

    }

});

//AUTENTICACION



//AUTENTICACION DIONI CON TOKENS
/*
app.post('/api/v1/login/takingstats', (req, res) => {
    var username = req.body.user;
    var password = req.body.password;

    if (!(username === 'test' && password === 'test')) {
        res.status(401).send({
            error: 'usuario o contraseña inválidos'
        });
        return;
    }

    var tokenData = {
        username: username

    };

    var token = jwt.sign(tokenData, 'Secret Password', {
        expiresIn: 60 * 60 * 24 // expires in 24 hours
    });

    res.send({
        token
    });
});


app.get('/api/v1/secure/takingstats', (req, res) => {
    var token = req.headers['authorization'];
    if (!token) {
        res.status(401).send({
            error: "Es necesario el token de autenticación"
        });
        return;
    }
});
*/
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
    
    subsidiesStats.find({}, {projection: {_id: 0} }).toArray((err, subsidiesStatsArray) =>{
        
        if(subsidiesStatsArray.length == 0){
            
            subsidiesStats.insert(newSubsidiesStats);
            res.sendStatus(200);
            console.log("Base de datos inicializada con: " +subsidiesStatsArray.length+ "campos");
            
        }else{
            
            res.sendStatus(409);
            
        }
        
    });
    
});


//GET /subsidiesStats

app.get("/api/v1/subsidiesStats", (req,res)=>{
    
    subsidiesStats.find({}).toArray((err,subsidiesStatsArray)=>{
        
        if(err)
            console.log("Error: "+err);
        
        res.send(subsidiesStatsArray);        
    });

});


// POST /subsidiesStats

app.post("/api/v1/subsidiesStats", (req,res)=>{
    
    var newFilm = req.body;
    var film = req.body.film;
    
    
    subsidiesStats.find({film:film}).toArray((err, subsidiesStatsArray)=>{
        if(err)
            console.log(err);
    
    
    if(subsidiesStatsArray != 0){
        
    
    
    res.sendStatus(409);
    
        
    } else if (req.body.hasOwnProperty("country") == false || req.body.hasOwnProperty("year") == false || req.body.hasOwnProperty("subsidyReceibed") == false
    || req.body.hasOwnProperty("subsidyBudgetProject") == false || req.body.hasOwnProperty("subsidyPercentage") == false || Object.keys(newFilm).length != 6){
        
        res.sendStatus(400);
    
    }else{
    subsidiesStats.insert(newFilm);
    res.sendStatus(201);
    }
    });
    
});


app.listen(port, () => {
    console.log("Super server ready on port " + port);
});


//c) GET /subsidiesStats/:film
app.get("/api/v1/subsidiesStats/:film", (req,res)=>{

    var film = req.params.film;
    
    subsidiesStats.find({film:film}).toArray((err,subsidiesStatsArray)=>{
        
        if(err)
            console.log("Error: "+err);
        if(subsidiesStatsArray == 0){
            
            res.sendStatus(404);
            
        }else{
        
        res.send(subsidiesStatsArray);      
        }
    });
    

});

//d) DELETE /subsidiesStats/:film
app.delete("/api/v1/subsidiesStats/:film", (req,res)=>{

    var film = req.params.film;
    
    subsidiesStats.find({film:film}).toArray((err, subsidiesStatsArray)=>{
        if(err)
            console.log(err);
        
        
        if (subsidiesStatsArray==0){
            
            res.sendStatus(404);
            
        }else{
            
            subsidiesStats.deleteOne({film:film});
            res.sendStatus(200);
    
        }
    });

});

//PUT a /subsidiesStats/:film

app.put("/api/v1/subsidiesStats/:film", (req,res)=>{

    var film = req.params.film;
    var UpdatedFilm = req.body;

    subsidiesStats.find({"film":film}).toArray((err, subsidiesStatsArray)=>{
        if(err)
            console.log(err);
        
        
        if (subsidiesStatsArray==0){
            
            res.sendStatus(404);
            
        }else if (req.body.hasOwnProperty("country") == false || req.body.hasOwnProperty("year") == false || req.body.hasOwnProperty("subsidyReceibed") == false
    || req.body.hasOwnProperty("subsidyBudgetProject") == false || req.body.hasOwnProperty("subsidyPercentage") == false 
    || Object.keys(UpdatedFilm).length != 6 
    || req.body.film != film){
            
            res.sendStatus(400);
            
        }else{
            
            subsidiesStats.updateOne({"film":film}, {$set:UpdatedFilm});
            res.sendStatus(200);
            
        }
    });
});

//DELETE ALL

app.delete("/api/v1/subsidiesStats", (req,res)=>{
    
    subsidiesStats.remove({});

    res.sendStatus(200);

});

//POST no permitido

app.post("/api/v1/subsidiesStats/:film", (req,res)=>{
    
    res.sendStatus(405);
    
});

//PUT no permitido

app.put("/api/v1/subsidiesStats/", (req,res)=>{

    res.sendStatus(405);
    
});


//------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------

//---------------------------------------API ZOILO---------------------------------------------------------------------------


const MongoClientZoilo = require("mongodb").MongoClient;
const uriZoilo = "mongodb+srv://test:test@sos1819-qyoud.mongodb.net/sos1819?retryWrites=true";
const clientZoilo = new MongoClientZoilo(uriZoilo, { useNewUrlParser: true });


var earningsInterStats;


clientZoilo.connect(err => {
  earningsInterStats = clientZoilo.db("sos1819").collection("earningsInterStats");

  console.log("Connected!");
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

app.get("/api/v1/earnings-inter-stats/docs", (req,res)=>{

    res.status(301).redirect("https://documenter.getpostman.com/view/6889093/S17tRoM9");
});

// GET /earningsInterStats/loadInitialData

app.get("/api/v1/earnings-inter-stats/loadInitialData", (req,res)=>{
   
     earningsInterStats.find({}).toArray((err,earningsInterStatsArray) => {
         if(err){
             console.log("Error: " + err);
         }else{
            if(earningsInterStatsArray.length==0) {
                earningsInterStats.insertMany(newEarningsInterStats);
                res.sendStatus(200);
                console.log("Base de datos inicializada");
            }else{
                console.log("La base de datos tiene: " + earningsInterStatsArray.length + " recursos");
        }
         }
         
       
     });
});

// GET /earningsInterStats/

app.get("/api/v1/earnings-inter-stats", (req,res)=>{
    
    earningsInterStats.find({}).toArray((err,earningsInterStatsArray) => {
        if(err)
            console.log("Error: " + err);
        
        res.send(earningsInterStatsArray);
    });
});


// POST /earningsInterStats/

app.post("/api/v1/earnings-inter-stats", (req,res)=>{
    
    var newEarningInterStat = req.body;
    var title = req.body.title;
    
    if (newEarningInterStat.length > 6 || !newEarningInterStat.country || !newEarningInterStat.year || !newEarningInterStat.title ||
        !newEarningInterStat.territory || !newEarningInterStat.earning || !newEarningInterStat.territoryTotal) {

        res.sendStatus(400);
        return;
    }
    
    earningsInterStats.find({title:title}).toArray((err,earningsInterStatsArray) => {
        if(err)
            console.log("Error: " + err);
        if(earningsInterStatsArray.length != 0) {
             res.sendStatus(409);
        }else{
            earningsInterStats.insertOne(newEarningInterStat);
            res.sendStatus(201);
           
        }
        
    });
    
});

// PUT /earningsInterStats/

app.put("/api/v1/earnings-inter-stats", (req,res)=>{
   
    res.sendStatus(405);
});



// DELETE /earningsInterStats/

app.delete("/api/v1/earnings-inter-stats", (req,res)=>{
    
    earningsInterStats.deleteMany();
    res.sendStatus(200);
});


// GET /earningsInterStats/title

app.get("/api/v1/earnings-inter-stats/:title", (req,res)=>{

    var title = req.params.title;
    
    earningsInterStats.find({title:title}).toArray((err,earningsInterStatsArray) => {
        if(err){
            console.log(err);
        }
        if(earningsInterStatsArray.length==0) {
            res.sendStatus(404);
        }else{
            res.send(earningsInterStatsArray);
        }
     });
});

// POST /earningsInterStats/title

app.post("/api/v1/earnings-inter-stats/:title", (req,res)=>{
    res.sendStatus(405);
});


// PUT /earningsInterStats/title

app.put("/api/v1/earnings-inter-stats/:title", (req,res)=>{

    var title = req.params.title;
    var updatedFilm = req.body;
    var newEarningInterStat = req.body;

    
    if (newEarningInterStat.length > 6 || !newEarningInterStat.country || !newEarningInterStat.year || !newEarningInterStat.title ||
        !newEarningInterStat.territory || !newEarningInterStat.earning || !newEarningInterStat.territoryTotal || req.body.title != title) {

        res.sendStatus(400);
        return;
    }

     earningsInterStats.find({title:title}).toArray((err,earningsInterStatsArray) => {
        if(err){
            console.log(err);
        }
        if(earningsInterStatsArray.length==0) {
            res.sendStatus(404);
        }else{
            earningsInterStats.updateOne({title:title}, {$set:updatedFilm});
            res.sendStatus(200);
        }
     });
});


// DELETE /earningsInterStats/title

app.delete("/api/v1/earnings-inter-stats/:title", (req,res)=>{

    var title = req.params.title;
    
    earningsInterStats.find({title:title}).toArray((err,earningsInterStatsArray) => {
        if(err){
            console.log(err);
        }
        if(earningsInterStatsArray.length==0) {
            res.sendStatus(404);
        }else{
            earningsInterStats.deleteOne(earningsInterStatsArray[0]);
            res.sendStatus(200);
        }
     });
});

