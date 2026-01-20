const mongoose = require('mongoose');

const DB_CONNECT = process.env.DB_CONNECT;

exports.connect = () => {
    mongoose.set('strictQuery' , true)
    //connecting to the daatabase 
    mongoose.connect(DB_CONNECT , {
        useNewUrlParser : true
    })
    .then(() => {
        console.log("Successfully Connected to database !");
    })
    .catch((err) => {
        console.log("database connection failed ...")
        console.log(err);
        process.exit(1)
    })
}