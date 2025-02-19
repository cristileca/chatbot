import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://mariancristianleca:NHuAQJOb1dnmGrv0@chatbot.k8vyl.mongodb.net/?retryWrites=true&w=majority&appName=Chatbot");
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
  }
};

export default connectDB;