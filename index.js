var express = require("express");
var bodyParser = require("body-parser");
//var mongoose = require("mongoose");
//app.use(mongoose.json());

var app = express();

app.use("/",express.static(__dirname+"/public"));



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
}];



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
    || req.body.length != 6 
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