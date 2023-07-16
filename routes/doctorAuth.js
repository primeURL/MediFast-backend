const router = require("express").Router();
const AddDoctorSchema = require('../models/addDoctorSchema')
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
    console.log(req.body);
	try {
		const user = await AddDoctorSchema.findOne({ email: req.body.email });
        console.log(user);
		if (!user)
			return res.status(401).send({ message: "Invalid Email or Password" });

	    if (user.password !== req.body.password)
			return res.status(401).send({ message: "Invalid Email or Password" });
        
        const token = jwt.sign({ _id : JSON.stringify(user._id) }, process.env.JWTPRIVATEKEY, {
            expiresIn: "7d",
        });
		res.status(200).send({data: token,id:(user._id),message: "Logged in successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;