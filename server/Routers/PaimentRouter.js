const express = require("express");
const router = express.Router();
const {CreatePaiment , DeletePaiment , GetAllPaiments , getSignlePaiment } = require("../Controllers/PaimentController");
const verifyToken = require('../Middlewares/verifyToken')
const SyndicatMiddelwares = require('../Middlewares/SyndicatMiddelwares')


router.post('/paiment' ,verifyToken,SyndicatMiddelwares,CreatePaiment)
router.delete('/paiment/:id' ,verifyToken,SyndicatMiddelwares,DeletePaiment)
router.get('/paiments' ,verifyToken,SyndicatMiddelwares,GetAllPaiments)
router.get('/paiment/:id',verifyToken,SyndicatMiddelwares,getSignlePaiment)


module.exports = router;