//importing express
// const express = require('express');

import express from "express";
import env from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import morgan from "morgan";
import cors from "cors";
import "express-async-errors";

import testRoutes from "./routes/testRoutes.js";
import authRoute from "./routes/authRoute.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import userRoute from "./routes/userRoute.js";

//dotenv configuration
env.config();

//mongodb connection
connectDB();
//creating express app
const app = express();

//middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

//routes
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);

//middleware for error handling
app.use(errorMiddleware);
//port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(
    ` Node Server is running  in ${process.env.DEV_MODE} Mode on port ${PORT}`
      .yellow.bold
  );
});
