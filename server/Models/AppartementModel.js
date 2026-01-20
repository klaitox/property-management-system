const mongoose = require("mongoose");

const AppartementSchema = mongoose.Schema({
    Name_Residence: {
        type: String,
        required: [true, "please enter a name of residence"]
    },
    Appartement_number : {
        type: Number,
        required: [true, "please enter a Number of appartement"],
        unique: true
    }
})

module.exports = mongoose.model("Appartement", AppartementSchema);