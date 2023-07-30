const router = require("express").Router();
const BookedDoctorSchema = require('../models/BookedDoctors')
const AddDoctorSchema = require('../models/addDoctorSchema')
const sendEmail = require('../utils/sendEmail')
const {v4 : uuidv4} = require('uuid')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// This Route is to store booking of Doctors
router.post("/", async (req, res) => {
    const {doctorId,patientName,patientIssue,patientEmail,patientTime,totalAmount,token} = req.body
	try {
        const customer = await stripe.customers.create({
            email : token.email,
            source : token.id
        })
        const payment = await stripe.paymentIntents.create({
            amount : totalAmount * 100,
            customer : customer.id,
            currency : 'inr',
            receipt_email : token.email
        },{
            idempotencyKey : uuidv4()
        })
        if(payment){
            const response = await new BookedDoctorSchema(req.body)
            response.save()
            const data = await AddDoctorSchema.findOne({_id:doctorId})
            const text = ` <div style="margin: auto;border-radius:10px;font-family: sans-serif; width: 500px;box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;">
            <div style="text-align: center; padding: 10px;">
                <h1 style="color: rgb(218, 94, 94);">Your Patient Details</h1>
                <p>Patient Name : <b>${patientName}</b></p>
                <p>Patient Issue : <b>${patientIssue}</b></p>
                <p>Patient Email : <b>${patientEmail}</b></p>
                <p>Appointment Time : <b>${patientTime}</b> </p>    
            </div>
            <p style="text-align: center; padding:10px; font-weight: 300;color: coral;">To Accept An Appointment Login to your Profile Page</p>
                             </div>`
            await sendEmail(data.email,'You have Appointment from Patient','Good Morning',text)
            res.status(200).send('You Appointment Booked')
        }
       
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
        const text = ` <div style="margin: auto;border-radius:10px;font-family: sans-serif; width: 500px;box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;">
        <div style="text-align: center; padding: 10px;">
            <h1 style="color: rgb(218, 94, 94);">Your Appointment has been accepted by Doctor</h1>   
        </div>
        <p style="text-align: center; padding:10px; font-weight: 300;color: coral;">Check Profile Page for your Status</p>
                         </div>`
        await sendEmail(response.patientEmail,'Appointment Booked','Good Morning',text)
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