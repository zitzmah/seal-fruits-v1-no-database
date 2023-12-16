// import express
const express = require("express")
//import morgan
const morgan = require("morgan")
//import method override
const methodOverride = require("method-override")
//import or fuits router
const fruitsRouter = require("./controllers/fruits.js")

// import our fruits
// require will return the value of module.exports
const fruits = require("./models/fruits.js")

// create our app object
const app = express()

// middleware
app.use(express.static("public")) // use a "public" folder for files
// public/style.css -> /style.css
// public/app.js -> /app.js
//expres.urlencoded (parse url encoded bodies)
//adds the data to req.body
app.use(express.urlencoded({ extended: true }))
//morgan-log data about each request for debugging
app.use(morgan("dev"))
//methodOverride - allows us to override form post rquests
//as a different method like PUT or DELETE
//It will look for a _method url query
app.use(methodOverride("_method"))

//Register our fruitsRouter
app.use("/fruits", fruitsRouter)

// server listener to turn our server
app.listen(3000, () => {
    console.log('listening on port 3000')
})