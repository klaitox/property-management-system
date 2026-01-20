const asyncHandler = require("express-async-handler");
const Paiment = require("../Models/PaimentModel");
const AppartementModel = require("../Models/AppartementModel");
const ClientModel = require("../Models/ClientModel");



// @desc POST Single Paiment:
// @route POST http://localhost:3001/api/admin/paiment
// @access Private

const CreatePaiment = asyncHandler(async (req, res) => {

    const {Date , Montant , Appartement_number , CIN } = req.body;
    if(!Date || !Montant || !Appartement_number || !CIN ){
        res.status(400);
        res.json({message: "Please fill all the fields"})
    }
    // search for ID appartement TO send in req Add Paiment
    const SearchAppartement = await AppartementModel.findOne({Appartement_number: req.body.Appartement_number});
    if(!SearchAppartement){
        res.status(400)
        .json({message: "appartement Not Found"})
    } 
    // search for ID Client TO send in req Add Paiment
    const SearchClient = await ClientModel.findOne({CIN : CIN})
    if(!SearchClient){
        res.status(400)
        .json({message: "Client Not Found"})
    }
    // get ID Client and Appartement to send it to table paiment 
    const idClient = SearchClient._id;
    const idAppartement = SearchAppartement._id;
    // send DATA to table Paiment:
    const paiment = await Paiment.create({
        Date,
        Montant,
        Appartement_number: idAppartement,
        CIN: idClient
    });
    if(paiment){
        res.status(200)
           .json({message: "Paiment Passed Successfully"});
    }else{
        res.status(400)
            .json({message: "Invalid Paiment Data"})
    }

})

// @desc DELETE Single Paiment:
// @route DELETE http://localhost:3001/api/admin/paiment/:id
// @access Private

const DeletePaiment = asyncHandler(async (req, res) => {
    const paiment = await Paiment.findById(req.params.id);
    if(paiment){
        await paiment.remove();
        res.json({message: "Paiment Deleted"})
    }else{
        res.status(404)
        .json({message: "Paiment Not Found"})
    }
})

// @desc GTEALL Paiment:
// @route GET http://localhost:3001/api/admin/paiments
// @access Private

const GetAllPaiments = asyncHandler(async (req, res) => {
    const paiments = await Paiment.find({}).populate("Appartement_number").populate("CIN");
    if(paiments){
        res.status(200)
        .json(paiments)
    }else{
        res.status(404)
        .json({message: "Paiments Not Found"})
    }   
})


// @desc Get SINGLE PAIMENT BY ID :
// @route GET : http:://localhost:3001/api/admin/paiment/:id

const getSignlePaiment = asyncHandler(async(req,res) => {
    const paiment = await Paiment.findById(req.params.id).populate("Appartement_number").populate("CIN")
    if(paiment){
        res.status(200)
        .json(paiment)
    } else {
        res.status(400)
        .json({message: "Paiment Not found !!"})
    }
})




module.exports = {CreatePaiment , DeletePaiment , GetAllPaiments , getSignlePaiment };