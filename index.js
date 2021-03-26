const express = require("express");
const app = express()
const cors= require('cors')

//middleware
app.use(express.json()) //to use req.body
app.use(cors())


//Routes

//register and login routes
app.use("/auth", require("./routes/jwtAuth"));

//dashboard route
app.use("/dashboard", require("./routes/dashboard"));

//recipe routes
// app.use("recipe", require())


const port = process.env.PORT || 5000

app.listen(port, ()=> {
    console.log(`server is running on port ${port}`)
})