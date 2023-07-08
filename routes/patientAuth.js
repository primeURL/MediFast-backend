const router = require("express").Router();
const PatientSchema = require('../models/PatientSchema')
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
	try {
		let user = await PatientSchema.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });
        if(req.body.password !== req.body.confirmPassword){
            return res
				.status(409)
				.send({ message: "Password Does Not Matches, Please try again" });
        }
		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);
		const hashConfirmPassword = await bcrypt.hash(req.body.confirmPassword, salt);

		user = await new PatientSchema({ ...req.body, password: hashPassword, confirmPassword:hashConfirmPassword }).save();

		res.status(201).send({ message: "New Account Created Successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.post("/login", async (req, res) => {
    console.log(req.body);
	try {
		const user = await PatientSchema.findOne({ email: req.body.email });
		if (!user)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Email or Password" });
        
		const token = user.generateAuthToken();
		res.status(200).send({ data: token, userId:user._id,userName : user.firstName, message: "Logged in successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

//Route to Indiviudal Patient Details
router.get('/getPatientDetails/:userId',async(req,res)=>{
    try {
        const response = await PatientSchema.findOne({_id:req.params.userId})
		return res.status(200).send(response)
    } catch (error) {
        return res.status(500).send(error)
    }
})

module.exports = router;