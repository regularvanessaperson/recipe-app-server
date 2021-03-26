const router = require("express").Router();
const pool = require("../db")
const bcrypt = require("bcrypt");
const { json } = require("express");
const jwtGenerator = require("../utils/jwtGenerator")
const validInfo = require("../middleware/validInfo")
const authorization = require("../middleware/authorization");


//register route
router.post("/register", validInfo, async (req, res) => {
    try {
        // destructure req.body to get (name,email,password)
        const { name, email, password } = req.body;
        // check if user exists (if user exists throw error)
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
            email
        ])

        // res.json(user.rows)
        if (user.rows.length !== 0) {
            return res.status(401).json("User already exists")
        }
        // bcrypt the user password (for privacy)
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(password, salt)
        // enter the new user inside database

        const newUser = await pool.query("INSERT INTO users (user_name, user_email, user_password) VALUES ($1,$2,$3) RETURNING *", [name, email, bcryptPassword])

        // generate the jwt token

        const token = jwtGenerator(newUser.rows[0].user_id)

        res.json({ token });

    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error")
    }
})

//login route

router.post("/login", validInfo, async (req, res) => {
    try {
        //destructure req.body
        const { email, password } = req.body;
        //check if user doesn't exist (if not throw error)
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
            email
        ]);

        if (user.rows.length === 0) {
            return res.status(401).json("Password or Email is incorrect");
        }
        //check if incoming password is the same as the database password

        const validPassword = await bcrypt.compare(password, user.rows[0].user_password)

        // console.log(validPassword)

        if (!validPassword) {
            return res.status(401).json("Password or Email is incorrect")
        }
        //give them the jwt token
        const token = jwtGenerator(user.rows[0].user_id)

        res.json({ token })

    } catch (err) {
        console.error(err.message)
    }
})

//this will check if the token sent is valid using the authorization middleware
//so that it continues to show verified if true
router.get("/verified", authorization, async (req,res)=>{
    try{
        console.log(true)
        res.json(true)
    } catch (err) {
        console.error(err.message)
    }
})

module.exports = router;