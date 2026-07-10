import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.log(error);
  }
};

export default connectToMongoDB;



