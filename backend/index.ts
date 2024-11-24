import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import path from "path";
import sequelize from "./database/db";
import { Discussion, User, Task, Comment } from "./database/models";

dotenv.config

const PORT = process.env.PORT || 5665
const app = express()

app.use(cors())
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));

//app.use(errorHandler)

const start = async() => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: true });

        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
      } catch (e) {
        console.error("Server error:", e);
      }
}

start();