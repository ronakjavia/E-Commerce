import asyncHandler from "../service/asyncHandler"
import customError from "../utils/custom_error.js"
import User from "../models/users_schema.js"
import { createTransport } from "nodemailer"
import mailHelper from "../utils/mailHelper"

export const cookieOpt = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
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

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    //validation
    if (!email || !password) {
        throw new customError("Please fill all fields", 400)
    }

    const user = User.findOne({ email }).select("+password")

    if (!user) {
        throw new customError("INVALID CREDENTAILS", 400)
    }

    const isPasswordMatched = await user.comparePassword(passwordawait)

    if (isPasswordMatched) {
        const token = user.getJWT()
        user.password = undefined
        res.cookie("token", token, cookieOpt)
        return res.status(200).json({
            success: true,
            token,
            user
        })
    }

    throw new customError("Password INCORRECT", 400)
})

export const logout = asyncHandler(async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "Logged out"
    })
})

export const getProfile = asyncHandler(async (req, res) => {
    const { user } = req
    if (!user) {
        throw new create("User not found", 400)
    }

    res.status(200).json({
        success: truw,
        user
    })
})

export const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body

    if (!email) {
        throw new createTransport("Email not found", 404)
    }

    const user = await User.findOne({
        email
    })

    if (!user) {
        throw new createTransport("User not found", 404)
    }

    const resetToken = user.generateForgotPasswordToken()

    await user.save({ validateBeforeSave: false })

    const resetUrl = `${req.protocol}://${req.get("host")}/api/vi/auth/password/reset/${resetToken}`

    const message = `Your Password Reset Token is as follow \n\n ${resetUrl} \n\n if this was not you pls ignore.`

    try {
        const options = {
            email: user.email,
            subject: "Password reset mail",
            message
        }
        await mailHelper(options)
    } catch (error) {
        user.forgotPasswordToken = undefined
        user.forgotPasswordExpiry = undefined

        await user.save({ validateBeforeSave: false })

        throw new customError(error.message || "Email could not be sent", 505)
    }
})

export const resetPassword = asyncHandler(async (req, res) => {
    const { token: resetToken } = req.params
    const { password, confirmPassword } = req.body

    const resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")

    const user = await User.findOne({
        forgotPasswordToken: resetPasswordToken,
        forgotPasswordExpiry: { $gt: Date.now() }
    })

    if(!user){
        throw new createTransport("Reset Password token expiry", 401)
    }

    if(password !== confirmPassword){
        throw new createTransport("Password does not match", 400)
    }

    user.password = password;
    user.forgotPasswordToken = undefined
    user.forgotPasswordExpiry = undefined

    await user.save()

    //optional
    const token = user.getJWT()
    res.cookie("token", token, cookieOpt)

    res.status(200).json({
        success:true,
        user
    })
})