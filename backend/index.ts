import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import sequelize from "./database/db";
import { Discussion, User, Task, Comment } from "./database/models";
import router from "./routes";
import errorMiddleware from "./middleware/ErrorMiddleware";
import cookieParser from 'cookie-parser';
import './scheludes/notificationSchedule'
import upload from "./picture-store/multerConfig";

dotenv.config({ path: './.env' });

const PORT = process.env.PORT || 5665
const app = express()

app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3001'
}));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use('/api', router)
app.use(errorMiddleware)

//app.use(errorHandler)

const start = async() => {
    try {
        await sequelize.authenticate();
        await sequelize.sync(/*{ force: true }*/);

        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
      } catch (e) {
        console.error("Server error:", e);
      }
}

start();