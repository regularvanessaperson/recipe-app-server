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
        res.status(500).json("Error when making new list")
    }
})

//retrieve one list
router.get("/:id", authorization, async(req, res)=>{
    try{
        const listId = req.params.id
        const list = await pool.query("SELECT * FROM lists WHERE list_id =$1", [
            listId
        ])

        res.json(list.rows[0]);
    }catch( err) {
        console.error(err.message)
        res.status(500).json("Error when looking for list")
    }
})

//retrieve all lists
router.get("/", authorization, async(req, res)=>{
    try{
        
        const lists = await pool.query("SELECT * FROM lists WHERE user_id =$1", [
            req.user
        ])

        res.json(lists.rows);
    }catch( err) {
        console.error(err.message)
        res.status(500).json("Error when looking for all lists")
    }
})
//update list
//delete list

module.exports = router