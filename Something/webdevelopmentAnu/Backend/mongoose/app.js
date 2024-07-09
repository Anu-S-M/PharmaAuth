import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/mydb');
        // Use new server discovery and monitoring en);
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

connect(); // Call the connect function to establish the MongoDB connection

// Rest of your code
