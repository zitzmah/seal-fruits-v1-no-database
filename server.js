// import express
const express = require("express")
//import morgan
const morgan = require("morgan")
//import method override
const methodOverride = require("method-override")

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

// fruits index route
// get request to /fruits
// return all fruits
app.get("/fruits", (req, res) => {
    // res.send(fruits)
    // "index.ejs" => "./views/index.ejs"
    // {fruits} => {fruits:fruits}
    res.render("index.ejs", { fruits })
})

//New Route - Render a page with a form
//get request to /fruits/new
//allow us to have a form to create a new fruit
app.get("/fruits/new", (req, res) => {
    //render a template with our form
    //new.ejs = ./views/ + new.js
    res.render("new.ejs")
})

//Create Route - Receives Form Data, Creates New Fruit
//post request to /fruits
//create a fruit from the form data, then redirect back to index
app.post("/fruits", (req, res) => {
    //get the form data from the request
    const body = req.body
    //send back the form data as JSON
    //res.send(body)
    //convert the readyToEat to true/false
    if (body.readyToEat === "on") {
        body.readyToEat = true
    } else {
        body.readyToEat = false
    }

    //add the fruit to the array
    fruits.push(body)

    //redirect them back to index page
    res.redirect("/fruits")
})

//DESTROY ROUTE - Deletes a Fruit
//DELETE -> /fruits/:id
//deletes the specified fruit, redirects to index
app.delete("/fruits/:id", (req, res) => {
    //get the id from params
    const id = req.params.id
    //then we'll splice it from the array
    //arr.splice(index, numOfItemToCut)
    fruits.splice(id, 1)
    //redirect back to index
    res.redirect("/fruits")
})

//EDIT ROUTE - Render a Form to Edit a specific fruit
//GET to /fruits/:id/edit
//Render a form with with the existing values filled in
app.get("/fruits/:id/edit", (req, res) => {
    //get the id from params
    const id = req.params.id//get the fruit being updated
    const fruit = fruits[id]
    //send the id and the fruit over to the template
    //edit.ejs -> ./views/edit.ejs
    res.render("edit.ejs", { fruit, id })
})

//UDATE ROUTE - Receive the form dta, updates the fruit
//PUT to /fruits/:id
//Update teh specified fruit, then redirect to index
app.put("/fruits/:id", (req, res) => {
    //get the id
    const id = req.params.id//get the body
    const body = req.body
    //convert readyToEat to true or false
    if (body.readyToEat === "on") {
        body.readyToEat = true
    } else {
        body.readyToEat = false
    }
    //swap the old version with the new version
    fruits[id] = body
    //redirect ack to the index page
    res.redirect("/fruits")
})

// fruits show route
// get request to /fruits/:id
// return a single fruit
app.get("/fruits/:id", (req, res) => {
    // get the id from params
    const id = req.params.id
    // get the fruit from the array
    const fruit = fruits[id]
    // send the fruit as the response
    // res.send(fruit)

    // render the show.ejs template
    // res.render(template, data)
    // for the template assume "/views/"
    // "show.ejs" =>  ./views/show.ejs
    res.render("show.ejs", { fruit, id })
    // {fruit} is the same as {fruit:fruit}
})

// server listener to turn our server
app.listen(3000, () => {
    console.log('listening on port 3000')
})