import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
    product: {
        type: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product"
                },
                count: Number,
                price: Number
            }
        ],
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObejctId,
        ref: "User",
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    coupon: String,
    transcationId: String,
    status: {
        type: String,
        enum: ["ORDERD", "SHIPPED", "DELIVERED", "CANCELLED"],
        default: "ORDERED"
    }

}, { timestamps: true })

export default mongoose.model("Order", orderSchema)