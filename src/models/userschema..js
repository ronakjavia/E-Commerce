import mongoose from "mongoose";
import AuthRoles from "../utils/authRoles.js"
import bcrypt from "bcryptjs"

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

// Encrypt pswd before save

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
}) // Can't use arrow function in some hooks in mongoose like pre

userSchema.methods = {
    // compare pswd
    comparePassword: async function(enteredPassword){
        return await bcrypt.compare(enteredPassword, this.password)
    }
}

exports.default = mongoose.model("User", userSchema)