const Client = require("../Models/ClientModel");
const Appartement = require("../Models/AppartementModel")
const Paiment = require("../Models/PaimentModel")
const asyncHandler = require("express-async-handler")


const getNumbersClient = asyncHandler(async(req,res) => {

    try {
        const count = await Client.countDocuments();
        res.json({count})
        .status(200)
      } catch (err) {
        res.status(400).send(err);
      }
})

const getNumbersAppartement = asyncHandler(async(req,res) => {

    try {
        const count = await Appartement.countDocuments();
        res.json({count})
        .status(200)
      } catch (err) {
        res.status(400).send(err);
      }
})


const getNumbersPaiment = asyncHandler(async(req,res) => {

    try {
        const count = await Paiment.countDocuments();
        res.json({count})
        .status(200)
      } catch (err) {
        res.status(400).send(err);
      }
})


module.exports = {getNumbersClient ,getNumbersAppartement, getNumbersPaiment }