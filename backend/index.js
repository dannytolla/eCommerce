const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const ConnectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config({
  path: "./backend/config/config.env",
});

const User = require("./routes/userRoute");
// const Product = require("./routes/productRoute");
// const Order = require("./routes/orderRoute");
// const Upload = require("./routes/uploadRoute");

ConnectDB();

const app = express();

app.use(express.json());

// app.use("/api/product", Product);
// app.use("/api/order", Order);
app.use("/api/user", User);
// app.use("/api/upload", Upload);

app.use(express.static(path.join(__dirname, "uploads")));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
});
