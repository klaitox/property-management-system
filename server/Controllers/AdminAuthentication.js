const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const Admin = require('../Models/AdminModel');



// @desc Auth Admin
// @route POST /api/admin/Register
// @access Private

    const RegisterAdmin = asyncHandler(async (req, res) => {
    const { First_Name, Second_Name, Email, Password, Phone_Number , Role } = req.body;
    
    if( !First_Name || !Second_Name || !Email || !Password || !Phone_Number) {
        res.status(400)
        .json({message: "please fill all fields !"})
    }
 
    // check for Email if already ixist 
    const AdminExists = await Admin.findOne({Email})
    if (AdminExists) {
        res.status(400)
        .json({message: "Admin Already Exist"})
    }
    // hash password :
    const RandomChar = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password , RandomChar);

    // Create Admin : 
    const admin = await Admin.create({
        First_Name,
        Second_Name,
        Email,
        Password: hashedPassword,
        Phone_Number,
        Role
    })
    if (admin) {
        res.status(200)
        .json({message: "Admin Created Successfully !"})
    } else {
        res.status(400)
        .json({message : "Error  please try later  ! thank you"})
    }
}) 


// @desc Auth Admin
// @route POST /api/admin/login
// @access public

    const Login = asyncHandler(async(req,res) => {
        const {Email , Password} = req.body;

    // check for admin email 
    const admin = await Admin.findOne({Email , Role: 'Syndicat'})
    if(admin){
        const isMatch = await bcrypt.compare(Password, admin.Password)
        if(isMatch){            
            const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET, {
                expiresIn: '24h' // expires in 24 hours
            });
            res.status(200)
            .set('Authorization' , `Bearer ${token}`)
            .json({token , admin})
        } else {
            res.status(400)
            .json({message: "Invalid Credentials"})
        }
    }
        else {
            res.status(400)
            .json({message: "Invalid Credentials"})
        }
    })


module.exports = {RegisterAdmin , Login};
