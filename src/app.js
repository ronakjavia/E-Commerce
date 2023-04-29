import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import routes from "./routes/index.js";

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(cookieParser())
app.use("/api/v1", routes)

app.get("/", (_req,res)=>{  // _req = Not used (basic syntax)
    res.send("hello RJ")
})
app.all("*", (_req,res)=>{
    return res.status.json({
        success:true,
        message: "Routes not found"
    })
})

// exports.default = app;
export default app;