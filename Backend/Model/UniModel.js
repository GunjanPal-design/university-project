
const mongooose = require("mongoose")
const userSchema = new mongooose.Schema({
    Name: String,
    Semester: String,

    Roll_No: {
        type: String,
        required: true,
        unique: true,

    },
    Phn_No: {
        type: String,
        required: true,
        unique: true,

    },
    Email: {
        type: String,
        required: true,
        unique: true,

    },
    Password: {
        type: String,
        required: true,
        unique: true,

    },


})

const uniModel =  mongooose.model("student", userSchema) // yeh colllection naam hai student
module.exports = uniModel;