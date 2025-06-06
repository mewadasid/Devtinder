const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

const uri = process.env.MONGODB_URI;
const connectDatabase = async () => {
  await mongoose.connect(uri);
};

module.exports = { connectDatabase };
