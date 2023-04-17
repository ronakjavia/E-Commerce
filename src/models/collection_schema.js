import mongoose, { Schema } from "mongoose";

const collectionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter a name"],
            trim: true,
            maxLength: [120, "Maximun length 120 characters"]
        }
    },
    { timestamps: true }
)

                                    //Schema Name, Schema Obj
exports.default = mongoose.model("Collection", collectionSchema)