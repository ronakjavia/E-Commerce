import dotenv from "dotenv"

dotenv.config()

const config = {
    PORT: process.env.PORT || 5000,
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/e_commerce',
    JWT_SECRET: process.env.JWT_SECRET || "yoursecret",
    JWT_EXPIRY: process.env.JWT_EXPIRY || "10d",
    S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
    S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,
    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
    S3_REGION: process.env.S3_REGION
}

exports.default = config;