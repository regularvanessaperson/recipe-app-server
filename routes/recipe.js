const router = require("express").Router();
const pool = require("../db")
const bcrypt = require("bcrypt");
const { json } = require("express");
const jwtGenerator = require("../utils/jwtGenerator")
const authorization = require("../middleware/authorization");

//retrieve all recipes
router.get("/", authorization, async(req, res)=>{
    try{
        
        const recipe = await pool.query("SELECT * FROM recipes WHERE user_id =$1", [
            req.user
        ])

        res.json(recipe.rows);
    }catch( err) {
        console.error(err.message)
        res.status(500).json("Error when looking for all recipes")
    }
})

//create new recipe
router.post("/new",async(req,res)=> {
    try {
        const {name, ingredients, instructions, user_id} = req.body;
        
        const newRecipe = await pool.query("INSERT INTO recipes (recipe_name, recipe_ingredients, recipe_instructions, user_id) VALUES ($1,$2,$3,$4) RETURNING *", [name, JSON.stringify(ingredients), instructions, user_id])
        res.json(newRecipe)
    } catch (err) {
        console.error(err)
        res.status(500).json("Error when making new recipe")
    }
})


module.exports = router