const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoD connected: ${conn.connection.host}`.cyan);
  } catch (err) {
    console.error(`Error: ${err.message}`.red);
    process.exit(1);
  }
};

export default ConnectDB;
