const express = require('express');
const router = express.Router();

const {RegisterAdmin , Login } = require('../Controllers/AdminAuthentication')

router.post('/register' , RegisterAdmin)
router.post('/login' , Login)


module.exports = router;