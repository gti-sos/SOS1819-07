
var path = "";

function isString(x) {
    return Object.prototype.toString.call(x) === "[object String]";
};


module.exports = function(app, BASE_PATH, takingstats) {
    path = BASE_PATH + "/takingstats/docs";
    app.get(path, (req, res) => {

    res.status(301).redirect("https://documenter.getpostman.com/view/3895452/S17tS8NX");

});
    
    path = BASE_PATH + "/takingstats";
    app.get(path, function(req, res) {
        var rankAux = parseInt(req.query.rank);
        var spectatorAux = parseInt(req.query.spectator);
        var moneyAux = parseInt(req.query.money);
        var yearAux = parseInt(req.query.year);
        var distributorAux = req.query.distributor;
        var countryAux = req.query.country;
        var filmAux = req.query.film;
        //variables auxiliares para paginación
        var limitAux = parseInt(req.query.limit);
        var offSetAux = parseInt(req.query.offset);

        if (Number.isInteger(limitAux) && Number.isInteger(offSetAux)) {
            //paginación
            takingstats.find({}, { projection: { _id: 0 } }).skip(offSetAux).limit(limitAux).toArray((err, newArrayTaking) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.send(newArrayTaking);
                }

            });
        }
       else if (Number.isInteger(spectatorAux)) {
            takingstats.find({ spectator:  spectatorAux  }, { projection: { _id: 0 } }).sort({ rank: -1 }).toArray((err, takingArray) => {
                if(takingArray.length==1){
                   return res.send(takingArray[0]); 
                }else{
                    return res.sendStatus(404);
                }
                
            });
        }
        else if (Number.isInteger(moneyAux)) {
            takingstats.find({ money:  moneyAux  }, { projection: { _id: 0 } }).sort({ rank: -1 }).toArray((err, takingArray) => {
                if(takingArray.length==1){
                   return res.send(takingArray[0]); 
                }else{
                    return res.sendStatus(404);
                }
            });
        }
        else if (Number.isInteger(rankAux)) {
            takingstats.find({ rank:rankAux  }, { projection: { _id: 0 } }).sort({ rank: -1 }).toArray((err, takingArray) => {
                if(takingArray.length!=1){
                   return res.send(takingArray); 
                }else{
                    return res.send(takingArray[0]);
                }
            });
        }
         else if (Number.isInteger(yearAux)) {
            takingstats.find({ year:  yearAux  }, { projection: { _id: 0 } }).sort({ rank: 1 }).toArray((err, takingArray) => {
                if(takingArray.length>=1){
                   return res.send(takingArray); 
                }else{
                    return res.sendStatus(404);
                }
            });
        }
         
        else if (isString(distributorAux)) {
            takingstats.find({ distributor: distributorAux }, { projection: { _id: 0 } }).sort({ rank: -1 }).toArray((err, takingArray) => {
                if(takingArray.length>=1){
                   return res.send(takingArray); 
                }else{
                    return res.sendStatus(404);
                }
            });
        } 
        else if (isString(filmAux)) {
            takingstats.find({ film: filmAux }, { projection: { _id: 0 } }).sort({ rank: -1 }).toArray((err, takingArray) => {
                if(takingArray.length==1){
                   return res.send(takingArray[0]); 
                }else{
                    return res.sendStatus(404);
                }
            });
        }
        
        else if (isString(countryAux) && Number.isInteger(rankAux)) {
            takingstats.find({ country: countryAux, rank: rankAux  }, { projection: { _id: 0 } }).sort({ rank: -1 }).toArray((err, takingArray) => {
                if(takingArray.length==1){
                   return res.send(takingArray[0]); 
                }else{
                    return res.sendStatus(404);
                }
            });

        }
        else {
            takingstats.find({}, { projection: { _id: 0 } }).toArray((err, takingsArray) => {
                if (err) {
                    console.log("Error: " + err);
                }
                else {
                    res.send(takingsArray);
                }
            });

        }


    });

    //GET /takingstats/:film
    path = BASE_PATH + "/takingstats/:film";
    app.get(path, (req, res) => {
        var film = req.params.film;
        var ok = false;
        takingstats.find({}, { projection: { _id: 0 } }).toArray((err, takingArray) => {

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

    //POST /takingstats
    path = BASE_PATH + "/takingstats";
    app.post(path, (req, res) => {
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



    //DELETE /takingstats/:film
    path = BASE_PATH + "/takingstats/:film";
    app.delete(path, (req, res) => {
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
                res.sendStatus(200);
            }
            else {
                res.sendStatus(400);
            }

        });
    });

    //PUT /takingstats/:film
    path = BASE_PATH + "/takingstats/:film";
    app.put(path, (req, res) => {
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
    path = BASE_PATH + "/takingstats/:film";
    app.post(path, (req, res) => {
        var newTaking = req.body;
        if (res.sendStatus(405)) { newTaking = []; }
    });

    //PUT /takingstats (debe dar error)
    path = BASE_PATH + "/takingstats";
    app.put(path, (req, res) => {
        var updatedFilm = req.body;
        if (res.sendStatus(405)) { updatedFilm = []; }
    });

    // DELETE /takingstats/
    path = BASE_PATH + "/takingstats";
    app.delete(path, (req, res) => {
        takingstats.remove({});
        res.sendStatus(200);
    });


};
