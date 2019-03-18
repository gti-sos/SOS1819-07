var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());

var port = process.env.PORT || 8080;

// API DIONI

var takingStats =  [{
    country: "Spain",
    year: "2017",
    film: "TadeoJones2",
    distributor: "PPI",
    money: "17.917.439 ",
    rank: "1",
    spectator:"3.227.410"
}, {
    country: "Spain",
    year: "2017",
    film: "PerfectosDesconocidos",
    distributor: "UPI",
    money: "14.373.417 ",
    rank: "2",
    spectator:"2.256.917"
},{
    country: "Spain",
    year: "2017",
    film: "LaLlamada",
    distributor: "DEAPLANETA",
    money: "2.705.357",
    rank: "12",
    spectator:"483.238"
},{
    country: "Spain",
    year: "2017",
    film: "LaLibreria",
    distributor: "ACONTRA",
    money: "2.366.547",
    rank: "13",
    spectator:"373.837"
}]; 

// API ZOILO

var earningsInterStats = [{
    country: "Spain",
    year: "2017",
    title: "LaPromesa",
    territory: "27",
    earning: "10.347.672",
    territoryTotal: "27"
}, {
    country: "Spain",
    year: "2017",
    title: "PerfectosDesconocidos",
    territory: "1",
    earning: "141.867",
    territoryTotal: "1"
}, {
    country: "Spain",
    year: "2017",
    title: "Abracadabra",
    territory: "1",
    earning: "2.911",
    territoryTotal: "1"
}];

// API MANUEL

var subsidiesStats = [{
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

//API REST diogalcam

// LOAD INITIAL DATA de GET /takingStats/
app.get("/api/v1/takingStats/loadInitialData",(req,res) => {
    var newTakingStats =[{
        country: "Spain",
        year: "2017",
        film: "TadeoJones2",
        distributor: "PPI",
        money: "17.917.439 ",
        rank: "1",
        spectator:"3.227.410"
    }, {
        country: "Spain",
        year: "2017",
        film: "PerfectosDesconocidos",
        distributor: "UPI",
        money: "14.373.417 ",
        rank: "2",
        spectator:"2.256.917"
}];
    
    if(takingStats.length<=0){ // si está vacío al hacer DELETE, entonces devolvemos los ingresos iniciales
        var i;
        for(i=0;i<=newTakingStats.length;i++){
            takingStats.push(newTakingStats[i]);
        }
        res.send(takingStats); //el servidor nos envía todos los ingresos
   }
});

//GET /takingStats
app.get("/api/v1/takingStats/",(req,res) => {
    res.send(takingStats);
});

//POST /takingStats
app.post("/api/v1/takingStats/",(req,res) => {
    var newTaking = req.body;
    takingStats.push(newTaking);
    res.sendStatus(201);
});

//GET /takingStats/:film
app.get("/api/v1/takingStats/:film", (req,res)=>{

    var film = req.params.film;

    var filteredFilms = takingStats.filter((t) =>{
       return t.film == film; 
    });
    
    if (filteredFilms.length >= 1){
        res.send(filteredFilms[0]);
    }else{
        res.sendStatus(404);
    }

});

//DELETE /takingStats/:film
app.delete("/api/v1/takingStats/:film", (req,res)=>{

    var film = req.params.film;
    var found = false;

    var updatedFilms = takingStats.filter((t) =>{
        
            if(t.film == film)  
                found = true;
        
            return t.film != film;
    });
    
    if (found == false){
        res.sendStatus(404);
    }else{
        takingStats = updatedFilms;
        res.sendStatus(200);
    }

});

//PUT /takingStats/:film
app.put("/api/v1/takingStats/:film", (req,res)=>{

    var film = req.params.film;
    var updatedFilm = req.body;
    var found = false;

    var updatedFilms = takingStats.map((t) =>{
    
        if(t.film == film){
            found = true;
            return updatedFilm;
        }else{
            return t;            
        }
 
    });
    
    
    if (found == false){
        res.sendStatus(404);
    }else{
        takingStats = updatedFilms;
        res.sendStatus(200);
    }

});

//POST /takingStats/:film (debe de dar error)
app.post("/api/v1/takingStats/:film",(req,res) => {
    var newTaking = req.body;
    
    if(res.sendStatus(405)){ //Method not allowed
        newTaking = []; //como se lanza este error entonces no se añade ninguna película pero igualmente no se puede hacer post a un recurso en concreto
    }else{
        takingStats.push(newTaking);
    }
    
    
});

//PUT /takingStats (debe dar error)
app.put("/api/v1/takingStats/", (req,res)=>{
   var updatedFilm = req.body;
    
     if(res.sendStatus(405)){
        updatedFilm = [];
    }
    

});

// DELETE /takingStats/
app.delete("/api/v1/takingStats/",(req,res) => {
    takingStats = [];
    res.sendStatus(200);
});

//------------------------------------------------------------------------------------------------------------------------------------//

// GET /earningsInterStats/loadInitialData

app.get("/api/v1/earningsInterStats/loadInitialData", (req,res)=>{
   
    var newFilm1 = {
        country: "Spain",
        year: "2017",
        title: "Neruda",
        territory: "33",
        earning: "4.154.241",
        territoryTotal: "34"    
    };
        
    var newFilm2 = {
        country: "Spain",
        year: "2017",
        title: "Ozzy",
        territory: "30",
        earning: "9.616.202",
        territoryTotal: "35"
    };
    
    earningsInterStats.push(newFilm1);
    earningsInterStats.push(newFilm2);
    res.send(earningsInterStats);
    
});

// GET /earningsInterStats/

app.get("/api/v1/earningsInterStats", (req,res)=>{
    
    res.send(earningsInterStats);
});


// POST /earningsInterStats/

app.post("/api/v1/earningsInterStats", (req,res)=>{

    var newFilm = req.body;
    earningsInterStats.push(newFilm);
    res.sendStatus(201);
});

// PUT /earningsInterStats/

app.put("/api/v1/earningsInterStats", (req,res)=>{
   
    res.sendStatus(405);
});



// DELETE /earningsInterStats/

app.delete("/api/v1/earningsInterStats", (req,res)=>{
    
    earningsInterStats =  [];
    res.sendStatus(200);
});


// GET /earningsInterStats/title

app.get("/api/v1/earningsInterStats/:title", (req,res)=>{

    var title = req.params.title;

    var filteredFilms = earningsInterStats.filter((c) =>{
       return c.title == title; 
    });
    
    if (filteredFilms.length >= 1){
        res.send(filteredFilms[0]);
    }else{
        res.sendStatus(404);
    }

});

// POST /earningsInterStats/title

app.post("/api/v1/earningsInterStats/:title", (req,res)=>{
    res.sendStatus(405);
});


// PUT /earningsInterStats/title

app.put("/api/v1/earningsInterStats/:title", (req,res)=>{

    var title = req.params.title;
    var updatedFilm = req.body;
    var found = false;

    var updatedFilms = earningsInterStats.map((c) =>{
    
        if(c.title == title){
            found = true;
            return updatedFilm;
        }else{
            return c;            
        }
 
    });
    
    if (found == false){
        res.sendStatus(404);
    }else{
        earningsInterStats = updatedFilms;
        res.sendStatus(200);
    }

});


// DELETE /earningsInterStats/title

app.delete("/api/v1/earningsInterStats/:title", (req,res)=>{

    var title = req.params.title;
    var found = false;

    var updatedFilms = earningsInterStats.filter((c) =>{
        
            if(c.title == title)  
                found = true;
        
            return c.title != title;
    });
    
    if (found == false){
        res.sendStatus(404);
    }else{
        earningsInterStats = updatedFilms;
        res.sendStatus(200);
    }

});

// ------------------------------------------------------------------------------------------------------------------------------------------//

//API REST Manuel

// LOAD INITIAL DATA de GET /subsidiesStats/
app.get("/api/v1/subsidiesStats/loadInitialData",(req,res) => {
    var film1 = {
    country: "Spain",
    year: "2017",
    film: "TadeoJones2",
    subsidyReceibed: "1.260.000",
    subsidyBudgetProject: "4.500.000",
    subsidyPercentage: "28"
}; 

var film2 ={
    country: "Spain",
    year: "2017",
    film: "PerfectosDesconocidos",
    subsidyReceibed: "800.000",
    subsidyBudgetProject: "3.502.329",
    subsidyPercentage: "22,84"
};
var film3 = {
    country: "Spain",
    year: "2017",
    film: "LaLlamada",
    subsidyReceibed: "723.109,46",
    subsidyBudgetProject: "1.807.773,66",
    subsidyPercentage: "40"
};


      
        subsidiesStats.push(film1);
        subsidiesStats.push(film2);
        subsidiesStats.push(film3);
        res.sendStatus(200);
});


//a) GET /subsidiesStats
app.get("/api/v1/subsidiesStats/",(req,res) => {
    res.send(subsidiesStats);
});

//b) POST /subsidiesStats
app.post("/api/v1/subsidiesStats/",(req,res) => {
    var newSubsidy = req.body;
    subsidiesStats.push(newSubsidy);
    res.sendStatus(201);
});

//c) GET /subsidiesStats/:film
app.get("/api/v1/subsidiesStats/:film", (req,res)=>{

    var film = req.params.film;

    var filteredFilms = subsidiesStats.filter((t) =>{
       return t.film == film; 
    });
    
    if (filteredFilms.length >= 1){
        res.send(filteredFilms[0]);
    }else{
        res.sendStatus(404);
    }

});

//d) DELETE /subsidiesStats/:film
app.delete("/api/v1/subsidiesStats/:film", (req,res)=>{

    var film = req.params.film;
    var found = false;

    var updatedFilms = subsidiesStats.filter((t) =>{
        
            if(t.film == film)  
                found = true;
        
            return t.film != film;
    });
    
    if (found == false){
        res.sendStatus(404);
    }else{
        takingStats = updatedFilms;
        res.sendStatus(200);
    }

});

//e) PUT /subsidiesStats/:film
app.put("/api/v1/subsidiesStats/:film", (req,res)=>{

    var film = req.params.film;
    var updatedFilm = req.body;
    var found = false;

    var updatedFilms = subsidiesStats.map((f) =>{
    
        if(f.film == film){
            
            found = true;
            return updatedFilm;
        }else{
            return f;            
        }
 
    });
    
    
    
    if (found == false){
        res.sendStatus(404);
    }else{
        subsidiesStats = updatedFilms;
        res.sendStatus(200);
    }

});

//f) POST /subsidiesStats/:film (debe de dar error)
app.post("/api/v1/subsidiesStats/:film",(req,res) => {
    
    res.sendStatus(405);

});

//g) PUT /subsidiesStats (debe dar error)
app.put("/api/v1/subsidiesStats/", (req,res)=>{
  
  res.sendStatus(405);

});

//h) DELETE /subsidiesStats/
app.delete("/api/v1/subsidiesStats/",(req,res) => {
    subsidiesStats = [];
    res.sendStatus(200);
});

// ------------------------------------------------------------------------------------------------------------------------------------------//

app.listen(port,() => {
   console.log("Magic is happening in port " + port); 
});