import mongoose from "mongoose";
import app from "./src/app.js"
import config from "./src/config/index.js";
// IIFE method
(async ()=>{
    try {
        await mongoose.connect(config.MONGODB_URL)
        console.log("DB Connected")

        // There might be some Err that express can throw it
        app.on("error", (err)=>{
            console.log('ERROR: ', err);
            throw err
        })

        const onListen = ()=>{
            console.log(`Listening on port ${config.PORT}`);
        }
        app.listen(config.PORT, onListen)
    } catch (err) {
        console.log("Error:", err);
        // console.error("Error:", err);
        throw err
    }
})()