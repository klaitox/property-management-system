const express = require("express")
const app = express.Router()
const {getNumbersClient , getNumbersAppartement , getNumbersPaiment}  = require('../Controllers/Counts')
const verifyToken = require('../Middlewares/verifyToken')
const syndicatMiddleware = require('../Middlewares/SyndicatMiddelwares')


app.get('/clientCount' ,verifyToken,syndicatMiddleware,getNumbersClient)
app.get('/appartementCount' ,verifyToken,syndicatMiddleware,getNumbersAppartement)
app.get('/paimentCount' ,verifyToken,syndicatMiddleware,getNumbersPaiment)


module.exports = app;