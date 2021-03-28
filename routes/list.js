const router = require("express").Router();
const pool = require("../db")
const bcrypt = require("bcrypt");
const { json } = require("express");
const jwtGenerator = require("../utils/jwtGenerator")
const validInfo = require("../middleware/validInfo")
const authorization = require("../middleware/authorization");

//create list
router.post("/new",async(req,res)=> {
    try {
        const {name, ingredients, user_id} = req.body;

        const newList = await pool.query("INSERT INTO lists (list_name,list_ingredients, user_id) VALUES ($1,$2,$3) RETURNING *", [name, ingredients, user_id])
        res.json(newList.rows[0])
    } catch (err) {
        console.error(err)
        res.status(500).json("Error when making new recipe")
    }
})

//retrieve one list
//retrieve all lists
//update list
//delete list

module.exports = router