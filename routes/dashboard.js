const router = require("express").Router()
const pool = require("../db");
const authorization = require("../middleware/authorization")

router.get("/", authorization, async(req, res)=>{
    try{
        //req.user has the payload
        // res.json(req.user)

        //can return all or some of the info using user_id don't want to reveal password so only name returned below
        const user = await pool.query("SELECT user_name FROM users WHERE user_id =$1", [
            req.user
        ])

        res.json(user.rows[0]);
    }catch( err) {
        console.error(error.message)
        res.status(500).json("Server Error")
    }
})


module.exports = router