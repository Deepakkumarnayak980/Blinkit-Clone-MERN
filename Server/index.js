import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import connectDB from './config/connectDB.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;  // ✅ Declare PORT here

// Middleware
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(helmet({
    crossOriginResourcePolicy: false,
}));

// Default route
app.get('/', (req, res) => {
    res.json({
        message: "Server is running on port " + PORT
    });
});

// Connect to DB and start server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("✅ Server is running on port " + PORT);
    });
});
