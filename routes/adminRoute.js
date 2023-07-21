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

router.get('/edit-clinic/:id', async(req,res) => {
    try{
        const id = req.params.id
        const clinic = await AddClinicSchema.findById(id)
        console.log(clinic)
        res.status(200).send(clinic)
    } catch(err){
        console.log('error while getting clinic by ID', err)
    }
})

router.put('/edit-clinic/:id', async(req,res) => {
    try{
        const body = req.body
        await AddClinicSchema.updateOne({_id:req.params.id}, body)
        res.status(201).send({message:"Clinic updated sucessfully"})

    } catch(err){
        console.log("error while updating the clinic", err)
    }
})

router.get('/edit-doctor/:id', async(req,res) => {
    try{
        const id = req.params.id
        const doctor = await AddDoctorSchema.findById(id)
        res.status(201).send(doctor)

    } catch(err){
        log("Error while getting doc by Id", err)
    }
})
router.put('/edit-doctor/:id', async(req,res) => {
    try{
        const body = req.body
        await AddDoctorSchema.updateOne({_id:req.params.id}, body)
        res.status(201).send({message:"Doctor updated"})

    } catch(err){
        log("Error while updating the doc", err)
    }
})


module.exports = router;