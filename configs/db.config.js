const mongoose = require("mongoose")

const connectToDb = 
    mongoose.connect("mongodb://127.0.0.1:27017/batoro")
    .then (response => {
       return console.log(`Connected to DB`)
    })
    .catch(error => {return console.log(error)})



module.exports = connectToDb