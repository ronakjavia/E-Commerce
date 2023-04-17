import dotenv from "dotenv"

dotenv.config()

const config = {
    PORT : process.env.PORT || 5000
    MONGO_URL : process.env.MONGO_URL || 'mongodb://localhost:27017/e_commerce'
}

exports.default = config;