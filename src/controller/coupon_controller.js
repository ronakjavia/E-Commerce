import coupon from "../models/coupon_schema.js"
import asyncHandler from "../service/asyncHandler.js"
import customError from "../utils/custom_error.js"

export const createCoupon = asyncHandler(async (req, res) => {
    const { code, discount } = req.body

    if (!code || !discount) {
        throw new customError("Code and Discount required", 400)
    }

    // check if already exist
    const coupon = await coupon.create({
        code, discount
    })

    res.status.json({
        success: true,
        message: "Coupon created successsfully",
        coupon
    })
})

export const updateCoupon = asyncHandler(async (req, res) => {
    const {id: couponId} = req.params
    const {action} = req.body

    const coupon = await coupon.findByIdAndUpdate(
        couponId,
        {
            active:action
        },
        {
            new:true,
            runValidators: true
        }
    )   

    if(!coupon){
        throw new customError("Coupon not found", 400)
    }

    res.status(200).json({
        success:true,
        message:"Coupon Updated",
        coupon
    })
})

export const deleteCoupon = asyncHandler(async (req, res) => {
    const {id: couponId} = req.params
    const coupon = await coupon.findByIdAndDelete(couponId)

    if(!coupon){
        throw new customError("Coupon not found", 404)
    }

    res.status(200).json({
        success:true,
        message:"Coupon Deleted successfully"
    })

})
export const getAllCoupon = asyncHandler(async (req, res) => {
    const allCoupon = await coupon.find()  // coupon.find() === coupon.find({})

    if (!allCoupon) {
        throw new customError("No coupon found", 404)
    }

    res.status.json({
        success: true,
        coupon
    })
})