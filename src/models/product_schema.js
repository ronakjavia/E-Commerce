import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide product name"],
        trim: true,
        maxLength: [120, "Maximum 120 characters"]
    },
    price: {
        type: Number,
        required: [true, "Please provide product price"],
        maxLength: [5, "Maximum 5 characters"]
    },
    description: {
        type: String
    },
    photos: [
        {
            secure_url: {
                type: String,
                required: true
            }
        }
    ],
    stock: {
        type: Number,
        default: 0
    },
    sold: {
        type: Number,
        default: 0
    },
    collectionId: {
        ref: "Collection"
    }

}, { timestamps: true })

exports.default = mongoose.model("product", productSchema)