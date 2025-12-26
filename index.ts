import express from "express"
import { env } from "./config/env"
import { errorHandler } from "./middleware/error"
import morgan from "morgan"
import { ApiResponse } from "./config/ApiResonce"


const app = express()

app.use(morgan("dev"));

app.get('/health',(req,res)=>{
    res.send("healthy")
})






app.use(errorHandler);
app.listen(env.PORT,()=>{
    console.log(`server started at http://localhost:${env.PORT}`)
})

