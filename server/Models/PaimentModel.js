const mongoose = require("mongoose");
const Appartement = require('./AppartementModel')
const Client = require('./ClientModel')

const PaimentAppartement = mongoose.Schema({
    Date : {
        type: Date,
        required: [true, "choose  a date "]
    },
    Montant : {
        type: Number,
        required: [true, "Please enter a montant of payment"]
    },
    Appartement_number : {
        type: String,
        ref: 'Appartement'
    },
    CIN: {
        type: String,
        ref: 'Client'
    }
})

module.exports = mongoose.model("Paiment" , PaimentAppartement)