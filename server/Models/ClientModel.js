const mongoose = require("mongoose");

const ClientSchema = mongoose.Schema({
    Name: {
        type: String,
        required: [true, "please enter a name of client"]
    },
    CIN: {
        type: String,
        required: [true, "please enter a CIN of client"],
        unique: true
    },
    Phone_number: {
        type: String,
        required: [true, "please enter a phone of client"],
        unique: true
    },
})

module.exports = mongoose.model("Client", ClientSchema);

