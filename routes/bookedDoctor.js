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




module.exports = router;