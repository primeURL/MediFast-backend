const router = require("express").Router();
const BookedDoctorSchema = require('../models/BookedDoctors')


// This Route is to store booking of Doctors
router.post("/", async (req, res) => {
	try {
        const response = await new BookedDoctorSchema(req.body)
        response.save()
        res.status(200).send('You Appointment Booked')
    } catch (error) {
        res.status(500).send(error)
    }
});

//This Route is for doctor to get Appointment
router.get("/getAppointment/:id", async (req, res) => {
	try {
        const response = await BookedDoctorSchema.find({doctorId:req.params.id})
        res.status(200).send(response)
    } catch (error) {
        res.status(500).send(error)
    }
});

router.get("/updateStatus/:id", async (req, res) => {
    console.log(req.params.id);
	try {
        const response = await BookedDoctorSchema.findOne({_id:req.params.id})
        console.log('rep',response);
        response.appointmentStatus = "Confirmed"
        response.save()
        res.status(200).send('Appointment Booked')
    } catch (error) {
        res.status(500).send(error)
    }
});

//This Route is for Patinet to get Appointment
router.get("/getPatientsAppointment/:id", async (req, res) => {
	try {
        const response = await BookedDoctorSchema.find({patientId:req.params.id})
        res.status(200).send(response)
    } catch (error) {
        res.status(500).send(error)
    }
});



module.exports = router;