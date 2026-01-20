const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors')
const router = require('./Routers/AdminAuthRouter')
const appartement = require('./Routers/AppartementRouters')
const client = require('./Routers/ClientRouter')
const paiment = require('./Routers/PaimentRouter')
const dashboard = require('./Routers/Dashboard')


const PORT = process.env.PORT_APP || 5000;
require('./Config/configDb').connect();



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({origin:true,credentials:true}));
app.use('/api/admin' , router);
app.use('/api/admin' , appartement);
app.use('/api/admin' , client);
app.use('/api/admin' , paiment);
app.use('/api/admin' , dashboard)


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});


module.exports = app ;