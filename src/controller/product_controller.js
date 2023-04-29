import formidable from "formidable"
import Product from "../models/product_schema.js"
import Mongoose from "mongoose"
import asyncHandler from "../service/asyncHandler.js"
import customError from "../utils/custom_error.js"
import config from "../config/index.js"
import { s3FileUpload, s3deleteFile } from "../service/imageUpload.js"
import fs from "fs"
import { log } from "console"

export const addProduct = asyncHandler(async (req, res) => {
    const from = formidable({ multiple: true, keepExtension: true })

    form.parse(req, async function (err, fields, files) {
        if (err) {
            throw new customError(err.message || "Something went wrong", 500)
        }

        let productId = new Mongoose.Types.ObjectId().toHexString()

        if (
            !fields.name ||
            !fields.price ||
            !fields.description ||
            !fields.collection
        ) {
            throw new customError("Please fill all the fields", 500)
        }

        let imgArrayResp = Promise.all(
            Object.keys(files).map(async (file, index) => {
                const element = file[fileKey]
                console.log(element);
                const data = fs.readFileSync(element.filepath)

                const upload = await s3FileUpload({
                    bucketNmae: config.S3_BUCKET_NAME,
                    key: `products/${productId}/photo_${index + 1}.png`,
                    body: data,
                    contentType: element.mimetype
                })

                console.log(upload);
                return {
                    secure_url: upload.Location
                }
            })
        )

        let imgArray = await imgArrayResp

        const product = await Product.create({
            _id: productId,
            photo: imgArray,
            ...fields
        })

        if (!product) {
            throw new customError("Product not created", 400)
        }
        res.status(200).json({
            success: true,
            product
        })
    })
})

export const getAllProduct = asyncHandler(async (req, res) => {
    const products = await Product.find({})

    if (!products) {
        throw new customError("No Product found", 400)
    }

    res.status(200).json({
        success: true,
        products
    })
})

export const getProductById = asyncHandler(async (req, res) => {
    const { id: productId } = req.params

    const product = await Product.findById(productId)

    if (!product) {
        throw new customError("No Product found", 400)
    }

    res.status(200).json({
        success: true,
        product
    })
})

export const getProductByCollectionId = asyncHandler(async (req, res) => {
    const { id: collectionId } = req.params

    const products = await Product.find(collectionId)

    if (!products) {
        throw new customError("No Product found", 400)
    }

    res.status(200).json({
        success: true,
        products
    })
})

// update product is h.w.
export const deleteProduct = asyncHandler(async (req, res) => {
    const { id: productId } = req.params

    const product = await Product.findById(productId)

    if (!product) {
        throw new customError("No Product found", 400)
    }

    /*
    resolve promise
    loop through photos array => delete each photo
    key: product._id
    */

    Promise.all(
        product.photos.map(async (elem, index) => {
            await s3deleteFile({
                bucketNmae: config.S3_BUCKET_NAME,
                key: `products/${product._id.toString()}/photo_${index + 1}.png`
            })

        })

    )
    await deletePhotos
    await product.remove()

    res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    })
})