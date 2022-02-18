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

    //validate user login info
    const { error } = loginValidation(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message})
    }
    //if login info is valid, find the user
    const user = await user.findOne({email: req.body.email});
    //throw error if the email is wrong (user does not exist in the DB)
    if (!user) {
        return res.status(400).json({ error: "Email is wrong or does not exist."});
    }
    //user exist - check for password correctness
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    //throw error if password is wrong
    if (!validPassword) {
        return res.status(400).json({ error: "Invalid password"});
    }
    //create authentication token with username and id

    //atach auth token to the header

    
})

module.exports = router;