const jwt = require('jsonwebtoken')
const Admin = require('../Models/AdminModel');

const syndicatMiddleware = async (req,res,next) => {

        // after retrieve id we need to ckeck role if is Syndicat :
        const admin = await Admin.findById({_id: req.user._id})
        const roleName = admin.Role 
        if(roleName !== 'Syndicat'){
            res.status(400)
               .json({message: "ACCES DENIED !!"})
        } 
        next()
    }


module.exports = syndicatMiddleware;