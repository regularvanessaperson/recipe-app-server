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
        res.json(newRecipe.rows[0])
    } catch (err) {
        console.error(err)
        res.status(500).json("Error when making new recipe")
    }
})

//retrive one recipe
router.get("/:id", authorization, async(req, res)=>{
    try{
        const recipeId = req.params.id
        const recipe = await pool.query("SELECT * FROM recipes WHERE recipe_id =$1", [
            recipeId
        ])

        res.json(recipe.rows[0]);
    }catch( err) {
        console.error(err.message)
        res.status(500).json("Error when looking for recipe")
    }
})

//edit one recipe
router.put("/edit/:id", authorization, async(req, res)=>{
    try{
        const recipeId = req.params.id
        
        //need to change each value at req.body.(table_field)
        const recipe = await pool.query("UPDATE recipes SET recipe_name=$1, recipe_ingredients=$2, recipe_instructions=$3, recipe_favorite=$4 WHERE recipe_id=$5 RETURNING * ", [req.body.recipe_name, JSON.stringify(req.body.recipe_ingredients), req.body.recipe_instructions, req.body.recipe_favorite, recipeId
        ])

        res.json(recipe.rows[0]);
    }catch( err) {
        console.error(err.message)
        res.status(500).json("Error when making changes to recipe")
    }
})

//retrive one recipe
router.put("/favorite/:id", authorization, async(req, res)=>{
    try{
        const recipeId = req.params.id
        
        //need to change each value at req.body.(table_field)
        const recipe = await pool.query("UPDATE recipes SET recipe_favorite=$1 WHERE recipe_id=$2 RETURNING * ", [ req.body.recipe_favorite, recipeId ])

        res.json(recipe.rows[0].recipe_favorite);
    }catch( err) {
        console.error(err.message)
        res.status(500).json("Error when making changes to recipe")
    }
})

//delete one recipe
router.delete("/delete/:id", authorization, async(req, res)=>{
    try{
        const recipeId = req.params.id
        const results = await pool.query("DELETE FROM recipes WHERE recipe_id =$1", [
            recipeId
        ])

        res.status(204).json({status: "success"})
    }catch( err) {
        console.error(err.message)
        res.status(500).json("Error when deleting this recipe")
    }
})

module.exports = router