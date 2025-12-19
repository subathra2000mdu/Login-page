import express from "express";
import cookieParser from "cookie-parser";
import "dotenv/config";
import cors from 'cors';
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import path from "path";

const app = express();
const port = process.env.PORT || 4000;
connectDB();

const allowedOrigin = ['http://localhost:5173'];

app.use(express.json())
app.use(cookieParser())
app.use(
    cors({
        origin: allowedOrigin,
        credentials: true
    })
)
app.use("/uploads", express.static("uploads"));
app.get('/', (req, res) => { return res.json({success: true, message: "API is Working!"})});
app.use('/api/auth', authRouter);
app.use("/api/jobs", jobRoutes);
app.use("/api/profile", profileRoutes);


app.listen(port, () => { console.log(`Server running on port ${port}`) });