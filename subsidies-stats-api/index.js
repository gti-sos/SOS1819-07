var api = require("./v2");
module.exports ={
    register : function(app,BASE_PATH,subsidiesStats){
        api(app,BASE_PATH+"/v2",subsidiesStats);
    }
   
};