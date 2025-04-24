import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const uri: string = process.env.MONGO_URI as string;

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {});
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Error connecting to MongoDB, err");
    process.exit(1);
  }
};

export default connectDB;
