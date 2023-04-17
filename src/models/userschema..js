import mongoose from "mongoose";
import AuthRoles from "../utils/authRoles.js"

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name required"],
        maxLength: [50, "Maximum Length 50 character"]
    },
    email:{
        type: String,
        required: [true, "Email required"],
    },
    password:{
        type: String,
        required: [true, "Pswd required"],
        minLength: [8, "Atleast 8 character"],
        select: false //It will not bring pswd along with info by default
    },
    role:{
        type: String,
        enums: Object.values(AuthRoles),
        default: AuthRoles.USER 
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date
}, {timestamps:true})

exports.default = mongoose.model("User", userSchema)