const mongoose = require("mongoose");

const bookedDoctorSchema = new mongoose.Schema({
	patientName: { type: String, required: true },
	patientPhone: { type: String, required: true },
	patientIssue: { type: String, required: true },
	appointmentDay: [{}],
	patientTime: { type: String, required: true },
	doctorId: { type: String, required: true },
	patientId: { type: String, required: true },
	appointmentStatus: { type: String, default:'Pending' },
});



const BookedDoctorSchema = mongoose.model("bookedDoctorSchema", bookedDoctorSchema);

module.exports =  BookedDoctorSchema;