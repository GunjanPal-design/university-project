const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const userroutes = require('./Routes/UniRoute');
const app = express();

app.use(express.json())
app.use(cors())
mongoose.connect("mongodb://localhost:27017/test")  // test database ka naam hai
    .then(() => {
        console.log("request send")
    })
    .catch((err) => {
        console.log("error occured", err)
    })

app.use('/api', userroutes);
app.listen(4000, () => {
    console.log("server is running at port 4040")
})
