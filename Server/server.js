import express from "express";
import { errorHandler, notFound } from "./Middleware/Errors.js";

import dotenv from "dotenv";
import connectDatabase from "./config/MongoDb.js";
import userRoute from './routes/UserRoutes.js'
import orderRoute from './routes/OrderRoutes.js'
import productRoute from "./routes/BookRoutes.js";
import ImportData from "./Dataimport.js";
import User from "./models/UserModel.js";

dotenv.config()
const app =express();
connectDatabase();
app.use(express.json())
app.use('/', ImportData);

app.use("/api/users",userRoute)
app.use("/api/orders",orderRoute)
app.use("/api/books", productRoute);
app.use(notFound)
app.use(errorHandler)

// app.get("/",(req,res)=>{
//     res.send("API is Running...");
// })

const PORT=process.env.PORT ||1000;
app.listen(PORT,console.log(`server run in port ${PORT}`));