const mongoose = require('mongoose');
const config = require("./config");

// database connected
const dbURL = config.db.url;

mongoose.connect(dbURL)
.then(()=>{
    console.log("Mongodb is connected")
}).catch((error)=>{
    console.log(error);
    process.exit(1);
});
