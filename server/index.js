/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import userRoutes from "./routes/user.js";
import teamRoutes from "./routes/team.js";

const app = express();
dotenv.config();

/** Middlewares */
app.use(express.json());
const corsConfig = {
  credentials: true,
  origin: true,
};
app.use(cors(corsConfig));
app.use(morgan("tiny"));

const port = process.env.PORT || 8800;

const connect = () => {
  mongoose.set("strictQuery", true);
  mongoose
    // .connect(process.env.MONGO_URL)
    .connect(
      "mongodb+srv://siddharthsharma5050:egVZOdRoJfJh9N6o@cluster0.5nnjn1t.mongodb.net/"
    )
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/team", teamRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.use(express.json());

app.listen(port, () => {
  console.log("Connected");
  connect();
});
