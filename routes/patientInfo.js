const router = require("express").Router();
const AddDoctorSchema = require('../models/addDoctorSchema')
const AddClinicSchema = require('../models/addClinicSchema')

// This Routes is to get Info of Doctor and Consultant
router.get("/doctorConsultant", async (req, res) => {
    console.log(req.body);
	try {
        const doctors = await AddDoctorSchema.find({})
        res.status(200).send(doctors)
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
});

router.get("/allClinic", async(req,res) => {
    try{
        const clinic = await AddClinicSchema.find({})
        res.status(200).send(clinic)
    } catch(err){
        console.log('error while getting clinic', err)
    }
})

module.exports = router;