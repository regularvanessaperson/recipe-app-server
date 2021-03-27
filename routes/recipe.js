const router = require("express").Router();
const pool = require("../db")
const bcrypt = require("bcrypt");
const { json } = require("express");
const jwtGenerator = require("../utils/jwtGenerator")
const authorization = require("../middleware/authorization");

//retrieve all recipes
router.get("/", authorization, async(req, res)=>{
    try{
        const recipe = await pool.query("SELECT * FROM recipes WHERE fk_user_id =$1", [
            req.user
        ])
        console.log(recipe)
        // res.json(recipe);
    }catch( err) {
        console.error(err.message)
        res.status(500).json("Error when looking for all recipes")
    }
})

//create new recipe
router.post("/new",async(req,res)=> {
    try {
        const {name, ingredients, instructions, user_id} = req.body;

        // const userId = await pool.query("SELECT user_name FROM users WHERE user_id =$1", [
        //     req.user.user_id
        // ])
        // console.log(userId)
        console.log(ingredients)
        const newRecipe = await pool.query("INSERT INTO recipes (recipe_name, recipe_ingredients, recipe_instructions, user_id) VALUES ($1,$2,$3,$4) RETURNING *", [name, JSON.stringify(ingredients), instructions, user_id])
        res.json(newRecipe)
    } catch (err) {
        console.error(err)
        res.status(500).json("Error when making new recipe")
    }
})


module.exports = router