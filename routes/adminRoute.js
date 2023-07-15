const router = require("express").Router();
const AddDoctorSchema = require('../models/addDoctorSchema')

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




module.exports = router;