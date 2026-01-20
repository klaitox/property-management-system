const asyncHandler = require('express-async-handler');
const Appartement = require('../Models/AppartementModel');


// @desc POST Single Appartement:
// @route POST /appartement
// @access Private

const CreateAppartement = asyncHandler(async (req, res) => {
    const { Name_Residence, Appartement_number } = req.body;
    if (!Name_Residence || !Appartement_number) {
        res.status(400)
            .json({ message: "please fill all fields !" })
    }

    const checkAppartementNumber = await Appartement.findOne({Appartement_number: req.body.Appartement_number})
    if(checkAppartementNumber){
        res.status(400)
        .json({message: "Appartement Already Exist "})
        
    }

    // Create Appartement :
    const appartement = await Appartement.create({
        Name_Residence,
        Appartement_number
    })
    if (appartement) {
        res.status(200)
            .json({ message: "Appartement Created Successfully !" })
    }
})
    
// @desc delete  Appartement:
// @route DELETE /appartement/:id
// @access Private

const DeleteAppartement = asyncHandler(async (req, res) => {
    const appartement = await Appartement.findById(req.params.id)
    if (appartement) {
        await appartement.remove()
        res.json({ message: 'Appartement removed' })
        .status(400)
    } else {
        res.status(404)
        res.json({message: "Appartement not found"})
        .status(400)
    }
})

// @desc update  Appartement:
// @route PUT /appartement/:id
// @access Private

const UpdateAppartement = asyncHandler(async (req, res) => {
    const {Name_Residence , Appartement_number} = req.body; 
    const _id = req.params.id;
    

    if(!Name_Residence || !Appartement_number){
        res.status(400)
        .json({message: "please fill all fields !"})
    }
    
    const checkAppartementAndUpdate = await Appartement.findOneAndUpdate({_id}, {
        Name_Residence,
        Appartement_number
    })
    if(checkAppartementAndUpdate){
        res.status(200)
        .json({message: "Appartement Updated Successfully !"})
    }
    else{
        res.status(400)
        .json({message: "Error  please try later  ! thank you"})
    }
})

// @desc GETALL  Appartement:
// @route GET /appartements
// @access Private

const GetAllAppartement = asyncHandler(async (req, res) => {
    const appartements = await Appartement.find({})
    if (appartements) {
        res.status(200)
            .json(appartements)
    } else {
        res.status(400)
            .json({ message: "Error  please try later  ! thank you" })
    }
})


// @desc GET SINGLE   Appartement:
// @route GET /appartement
// @access Private

const GetSingleAppartement = asyncHandler(async (req, res) => {
    const appartement = await Appartement.findById(req.params.id)
    if (appartement) {
        res.status(200)
            .json(appartement)
    } else {
        res.status(400)
            .json({ message: "Error  please try later  ! thank you" })
    }
})


            








module.exports = {CreateAppartement ,DeleteAppartement ,UpdateAppartement , GetAllAppartement , GetSingleAppartement};

