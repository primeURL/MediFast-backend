const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
// const passwordComplexity = require("joi-password-complexity");

const adminSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	confirmPassword: { type: String, required: true },
    isAdmin : {type:Boolean,default:false}
});

adminSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

const AdminSchema = mongoose.model("adminSchema", adminSchema);

module.exports =  AdminSchema;