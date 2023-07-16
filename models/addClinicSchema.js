const mongoose = require('mongoose')

const addClinicSchema = new mongoose.Schema({
    clinicName:{ type:String, required:true },
    country:{ type:String, required:true },
    clinicLocation:{ type:String, required:true },
    clinicPhone:{ type:String, required:true }
})

const AddClinicSchema = mongoose.model("addClinicSchema", addClinicSchema);

module.exports =  AddClinicSchema;