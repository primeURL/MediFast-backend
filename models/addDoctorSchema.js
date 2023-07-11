const mongoose = require("mongoose");

const addDoctorSchema = new mongoose.Schema({
	doctorName: { type: String, required: true },
	speciality: { type: String, required: true },
	qualification: { type: String, required: true },
	experience: { type: String, required: true },
	avaliableDays: [{}],
	startTime: { type: String, required: true },
	endTime: { type: String, required: true },
	consultationFee: { type: String, required: true },
    isAdmin : {type:Boolean,default:false}
});



const AddDoctorSchema = mongoose.model("addDoctorSchema", addDoctorSchema);

module.exports =  AddDoctorSchema;