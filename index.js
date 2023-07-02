const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const connectToMongo = require('./db')
require('dotenv').config()
const app = express();
connectToMongo()
app.use(cors())
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
const patientRoutes = require('./routes/patientAuth')

app.use("/api/patient", patientRoutes);

app.get('/',(req,res)=>{
    res.send('Inside index.js')
})

app.listen(8080,()=>console.log('Server started at port 8080'))