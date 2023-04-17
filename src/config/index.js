import dotenv from "dotenv"

dotenv.config()

const config = {
    PORT : process.env.PORT || 5000,
    MONGO_URL : process.env.MONGO_URL || 'mongodb://localhost:27017/e_commerce',
    JWT_SECRET : process.env.JWT_SECRET || "yoursecret",
    JWT_EXPIRY : process.env.JWT_EXPIRY || "10d",
}

exports.default = config;