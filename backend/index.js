const express = require("express");
const dotenv = require("dotenv");
const color = require("color");
const ConnectDB = require("./config/db");

dotenv.config();

ConnectDB();

const app = express();

app.use(express.json());

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
