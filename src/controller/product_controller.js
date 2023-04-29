import formidable from "formidable"
import Product from "../models/product_schema.js"
import Mongoose from "mongoose"
import asyncHandler from "../service/asyncHandler.js"
import customError from "../utils/custom_error.js"
import config from "../config/index.js"
import { s3FileUpload, s3deleteFile } from "../service/imageUpload.js"
import { ObjectId } from "mongoose"

export const addProduct = asyncHandler(async (req, res) => { 
    const from = formidable({multiple: true, keepExtension: true})

    form.parse(req,async function(err, fields, files){
        if(err){
            throw new customError(err.message || "Something went wrong", 500)
        }

        let productId = new Mongoose.Types.ObjectId().toHexString()
    })
})