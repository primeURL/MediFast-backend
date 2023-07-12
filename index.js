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
const patientAuth = require('./routes/patientAuth')
const adminRoute = require('./routes/adminRoute')
const patientInfo = require('./routes/patientInfo')

app.use("/api/patient", patientAuth);
app.use("/api/admin", adminRoute);
app.use("/api/patientInfo", patientInfo);

app.get('/',(req,res)=>{
    res.send('Inside index.js')
})

app.listen(8080,()=>console.log('Server started at port 8080'))