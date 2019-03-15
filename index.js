var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());

var port = process.env.PORT || 8080;

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

// GET /earningsInterStats/

app.get("/earningsInterStats", (req,res)=>{
    res.send(earningsInterStats);
});


// POST /earningsInterStats/

app.post("/earningsInterStats", (req,res)=>{
    
    var newFilm = req.body;
    
    earningsInterStats.push(newFilm)
    
    res.sendStatus(201);
});

// PUT /earningsInterStats/

app.put("/earningsInterStats", (req,res)=>{
    res.sendStatus(405);
});



// DELETE /earningsInterStats/

app.delete("/earningsInterStats", (req,res)=>{
    
    earningsInterStats =  [];

    res.sendStatus(200);
});


// GET /earningsInterStats/title

app.get("/earningsInterStats/:title", (req,res)=>{

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

app.post("/earningsInterStats/:title", (req,res)=>{
    res.sendStatus(405);
});


// PUT /earningsInterStats/title

app.put("/earningsInterStats/:title", (req,res)=>{

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

app.delete("/earningsInterStats/:title", (req,res)=>{

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

// ------------------------------------------------------------------------------------------------------

app.listen(port,() => {
   console.log("Magic is happening in port " + port); 
});