const port = 8000
const express = require("express")
const cors = require("cors")
//const morgan = require("morgan")
const User = require("./models/user.model")
const connectToDb = require("./configs/db.config")

const app = express()


app.use(express.json())
//app.use(morgan("combined"))
app.use(cors(
    {origin: "*"}
))


app.post("/", async (req, res) => {
    try {
        const newUser = await User.create(req.body) 
        if (newUser.referredBy) {
            const referralUser = await User.findByIdAndUpdate(newUser.referredBy, {$inc:{"referrals": 1}})
        }
        res.status(201).json(newUser)
    }
    catch(error) {
        res.status(400).json(error)
    }
})

app.get("/:id", async(req, res) => {
    try{
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    }
    catch(error) {
        res.status(400).json(error)
    }
})

app.get("/", async(req,res) => {
    try {
        const allUsers = await User.find() 
        res.status(200).json(allUsers)
    }
    catch(error) {
        res.status(400).json(error)
    }
})


connectToDb.then(() => 
    app.listen(port, () => console.log(`Connected to port ${port}`))   
)
.catch(err => console.log(err))