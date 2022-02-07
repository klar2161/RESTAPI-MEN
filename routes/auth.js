const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { registerValidation} = require('../validation');

// /Registration
router.post("/register", async (req, res) => {

    // validate the user input (name,email,password)
    const { error } = registerValidation(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message})
    }
    // check if the email is already registered
    const emailExist = await user.findOne({email: req.body.email});

    if (emailExist) {
        return res.status(400).json({ error: "Email already exists."});
    }
    // hash the password
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    //create a user object and save it to the DB
    const userObject = new User(
        {
            name: req.body.name,
            email: req.body.email,
            password
        }
    );

    try {

        const savedUser = await userObject.save();
        res.json({error: null, data: savedUser._id });

    } catch (error) {
        res.status(400).json({error});
    }
});

// /Login
router.post("/login", async (req, res) => {
    
})

module.exports = router;