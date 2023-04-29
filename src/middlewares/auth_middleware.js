import User from "../models/users_schema.js"
import Jwt, { decode } from "jsonwebtoken"
import asyncHandler from "../service/asyncHandler.js"
import config from "../config/index.js"
import customError from "../utils/custom_error"


// middleware
export const isLoggedIn = asyncHandler(async (req, res, next) => {
    let token;

    if (req.cookies.token || req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        // token = "Bearer gjigjroijewioudfoi" 
        token = req.cookies.token || req.headers.authorization.split(" ")[1]
    }

    if (!token) {
        throw new customError("Not authorized", 400)
    }

    try {
        const decodedJWTpayload = Jwt.verify(token, config.JWT_SECRET)

        req.User = await User.findById(decodedJWTpayload._id, "name email role")
        next()
    } catch (error) {
        throw new customError("Not authorized", 404)
    }
})

export const authorize = (...requiredRoles)=> asyncHandler(async(req, res, next)=>{
    if(!requiredRoles.includes(req.User.role)){
        throw new customError("you r not authorize")
    }
    next()
})