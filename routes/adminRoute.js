const router = require("express").Router();
const AddDoctorSchema = require('../models/addDoctorSchema')
const AddClinicSchema = require('../models/addClinicSchema')

// This Routes is to add new Doctor
router.post("/addDoctor", async (req, res) => {
    console.log(req.body);
	try {
        const doctor = await new AddDoctorSchema(req.body)
        doctor.save()
        res.status(200).send({message:"Doctor Added successfully"})
    } catch (error) {
        res.status(500).send(error)
    }
});
router.delete("/delete/:id", async(req,res) => {
    try{
        const id = req.params.id
        await AddDoctorSchema.deleteOne({_id:id})
        res.status(201).send({message: "doctor deleted successfully"})

    } catch(err){
        console.log(err);
    }
})


router.post('/addClinic', async(req,res) => {
    try{
        const clinicDetails = await new AddClinicSchema(req.body)
        clinicDetails.save()
        res.status(200).send({message:"Clinic added sucessfully"})
    } catch(err){
        console.log(`error while adding clinic, ${err}`)
    }
})

router.delete('/remove-clinic/:id', async(req,res) => {
    try{
        const id = req.params.id
        await AddClinicSchema.deleteOne({_id:id})
        res.status(201).send({message:"Clinic deleted from database"})
    } catch(err){
        console.log("error while deleting the clinic", err)
    }
})



module.exports = router;