const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const connectDb = require("./db/DbConnection");
const router = require("./routers/main");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

app.use(cors());
app.use(express.json());
//the api will be available on http://localhost:5000/api/v1
//the genral route of all the apis
app.use("/api/v1", router);

const port = 4000;

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is up on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
