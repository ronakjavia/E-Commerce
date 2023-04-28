import asyncHandler from "../service/asyncHandler"
import customError from "../utils/custom_error.js"
import User from "../models/users_schema.js"

export const cookieOpt = {
    expires: new Date(Date.now()+3*24*60*60*1000),
    httpOnly: true
}

export const signUp = asyncHandler(async (req, res) => {
    // get data from user
    const { name, email, password } = req.body

    //validation
    if (!name || !email || !password) {
        // throw new Error("Please add all fields")
        throw new customError("Please add all fieldS", 400)
    }

    // add data to DB
    const existingUser = await User.findOne({ email })

    if (existingUser) {
        throw new customError("User already exists", 400)
    }

    const user = await User.create({
        name,
        email,
        password
    })

    const token = user.getJWT()
    user.password = undefined

    // store token in user's cookie
    res.cookie("token", token, cookieOpt)
    // send back a response to user
    res.status(200).json({
        success: true,
        toke, 
        user,
    })
})

