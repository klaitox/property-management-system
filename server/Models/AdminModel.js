const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
    First_Name: {
        type: String,
        required: [true, "Please enter your first name"]
    },
    Second_Name: {
        type: String,
        required: [true, "Please enter your second name"]
    },
    Email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true
    },
    Password: {
        type: String,
        required: [true, "Please enter your password"]
    },
    Phone_Number: {
        type: String,
        required: [true , "please enter your phone number"]
    },
    Role: {
        type: String,
        default: "Syndicat"
    },
})

module.exports = mongoose.model("Admin", adminSchema);