const express = require('express');
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

const router = express.Router()

const dotenv = require('dotenv');

dotenv.config();

const JWT_Secret = process.env.SECRET;

// Route 1: Create a User using Post "/api/auth/createuser". Doesn't require Auth

router.post("/createuser", [
    body('name', 'Enter a Valid Name').isLength({ min: 3 }),
    body('email', 'Enter a Valid Email').isEmail(),
    body('password', 'Enter a valid Password').isLength({ min: 5 }),
], async (req, res) => {

    let success = false;

    // If there is an error return the bad request and the error

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // check whether the user with same email exists already.

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "Sorry! a user with this email already exists." })
        }

        // Hashing the password

        const salt = await bcrypt.genSalt(10);

        const secPass = await bcrypt.hash(req.body.password, salt)

        // Create a new User

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_Secret);

        // res.json(user);
        success = true
        res.json({ success, authtoken });
    } catch (e) {
        console.error(e.messsage);
        res.status(500).send("Internal Server Error");
    }
})

// Route 2: Authenticate a User using POST  "/api/auth/login". No Login required.

router.post("/login", [
    body('email', 'Enter a Valid Email').isEmail(),
    body('password', 'Password Cannot be blank').exists()
], async (req, res) => {

    let success = false;

    // If there is an error return the bad request and the error

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);

        if (!passwordCompare) {
            res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_Secret);

        success = true

        res.json({ success, authtoken });
    } catch (e) {
        console.error(e.messsage);
        res.status(500).send("Internal Server Error");
    }

})

// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) => {

    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})



module.exports = router;