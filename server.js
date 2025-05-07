const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/userRoute.js");
const castRouter = require("./routes/castRoute.js");
const movieRouter = require("./routes/movieRoute.js");
require("dotenv").config();

// App Config
const app = express();
const PORT = process.env.PORT || 4000;

// middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// api endpoints
app.use("/user", userRouter);
app.use("/cast", castRouter);
app.use("/movie", movieRouter);

mongoose
  .connect(process.env.MONGODB)
  // .connect(process.env.MONGODB)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on Port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });
