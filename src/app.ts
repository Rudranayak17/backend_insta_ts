import express from "express";
import { config } from "dotenv";
import cors from "cors";
import connectDB from "./database/db.js";
import { errorMiddleware } from "./middleware/error.js";
import userRouter from "./router/userRoutes.js";
config()

const PORT = process.env.PORT || 3000
const mongoURI = process.env.MONGO_URI!
console.log(mongoURI)
connectDB(mongoURI)
const app = express();
app.use(express.json())
app.use(cors())
app.use("/uploads", express.static("uploads"))

app.use("/api/v1/user", userRouter);
app.get('/', (req, res) => {
    res.send("<h1>Server running</h1>");
})
app.use(errorMiddleware);
app.listen(PORT, () => {
    console.log("port is listening on port " + "http://localhost:" + process.env.PORT)
})