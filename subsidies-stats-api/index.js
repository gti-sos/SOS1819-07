var api = require("./v1");
module.exports ={
    register : function(app,BASE_PATH,subsidiesStats){
        api(app,BASE_PATH+"/v1",subsidiesStats);
    }
   
};