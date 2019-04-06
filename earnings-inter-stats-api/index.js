var earningsInterStatsApi = {};

module.exports = earningsInterStatsApi;


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
    earning: 141867,
    territoryTotal: 1
    }];
    
earningsInterStatsApi.register = function(app, earningsInterStats) {
    console.log("Registering routes for earnings inter stats API...");
    
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
    
    // GET /earningsInterStats/ con búsqueda y paginación
    app.get("/api/v1/earnings-inter-stats", (req,res)=>{
        var country = req.query.country;
        var year = parseInt(req.query.year,10);
        var title = req.query.title;
        var territory = parseInt(req.query.territory,10);
        var earning = parseInt(req.query.earning,10);
        var territoryTotal = parseInt(req.query.territoryTotal,10);
        var limit = parseInt(req.query.limit,10);
        var offset = parseInt(req.query.offset,10);
        
        if(country) {
            earningsInterStats.find({"country":country}).toArray((err, earningsInterStatsArray)=>{
                if(err)
                console.log("Error: " + err);
                
                res.send(earningsInterStatsArray.map((c) => {
                        delete c._id;
                       return c;
                }));
            });
            }else if(year){
                earningsInterStats.find({"year":year}).toArray((err, earningsInterStatsArray)=>{
                    if(err)
                        console.log("Error: " + err);
                res.send(earningsInterStatsArray.map((c) => {
                        delete c._id;
                        return c;
                }));
            });
            }else if(title){
                earningsInterStats.find({"title":title}).toArray((err, earningsInterStatsArray)=>{
                    if(err)
                        console.log("Error: " + err);
                    res.send(earningsInterStatsArray.map((c) => {
                        delete c._id;
                        return c;
                    }));
            });
            }else if(territory){
                earningsInterStats.find({"territory":{$gte:territory}}).toArray((err, earningsInterStatsArray)=>{
                    if(err)
                        console.log("Error: " + err);
                    res.send(earningsInterStatsArray.map((c) => {
                        delete c._id;
                        return c;
                    }));
            });
            }else if(earning){
                earningsInterStats.find({"earning":{$gte:earning}}).toArray((err, earningsInterStatsArray)=>{
                    if(err)
                        console.log("Error: " + err);
                    res.send(earningsInterStatsArray.map((c) => {
                        delete c._id;
                        return c;
                    }));
            });
            }else if(territoryTotal){
                earningsInterStats.find({"territoryTotal":{$gte:territoryTotal}}).toArray((err, earningsInterStatsArray)=>{
                    if(err)
                        console.log("Error: " + err);
                    res.send(earningsInterStatsArray.map((c) => {
                        delete c._id;
                        return c;
                    }));
            });
            }else if(limit){
                earningsInterStats.find({}).limit(limit).skip(offset).toArray((err, earningsInterStatsArray)=>{
                    if(err)
                        console.log("Error: " + err);
                    res.send(earningsInterStatsArray.map((c) => {
                        delete c._id;
                        return c;
                    }));
                });
        }
        else{
            earningsInterStats.find({}).toArray((err,earningsInterStatsArray) => {
                if(err)
                    console.log("Error: " + err);
                res.send(earningsInterStatsArray.map((c) => {
                    delete c._id;
                    return c;
                }));
            });
        }
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
                var film = earningsInterStatsArray[0];
                delete film._id;
                res.send(film);
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
};
