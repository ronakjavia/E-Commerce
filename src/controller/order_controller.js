import Product from "../models/product_schema.js"
import Coupon from "../models/product_schema.js"
import Order from "../models/product_schema.js"
import asyncHandler from "../service/asyncHandler.js"
import customError from "../utils/custom_error.js"
import reazorpay from "../config/razorpay_config.js"
import razorpay from "../config/razorpay_config.js"
import { response } from "express"

export const generateRazorpayOrderId = asyncHandler(async (req, res) => {
    const { products, couponCode } = req.body

    if (!products || products.length === 0) {
        throw new customError("No Product Found", 400)
    }

    let totalAmount = 0
    let discountAmount = 0

    // TODO: Do product calculate based on DB calls
    let productPriceCalc = Promise.all(
        products.map(async (product) => {
            const { productId, count } = product;
            const productFromDB = await Product.findById(productId)

            if(!productFromDB){
                throw new customError("No Product in DB", 404)
            }

            if(productFromDB.stock < count){
                return res.status(400).json({
                    error: "Product not in stock"
                })
            }

            totalAmount += productFromDB.price * count
        })
    )

    await productPriceCalc

    const options = {
        amount: Math.round(totalAmount * 100),
        currency: "INR",
        receipt: `receipt_${new Date().getTime()}`
    }
    const order = await razorpay.orders.create(options)

    if(!order){
        throw new customError("No Order found", 401)
    }

    res.status(200).json({
        success:true,
        message:"Razorpay OrderId generated successfully",
        order
    })
})

export const generateOrder = asyncHandler(async (req, res) =>{})
export const getMyOrders = asyncHandler(async (req, res) =>{})
export const getAllOrders = asyncHandler(async (req, res) =>{})
export const updateOrderStatus = asyncHandler(async (req, res) =>{})