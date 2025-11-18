import mongoose from "mongoose";

let isConnected = false;

export async function connectDB() {
  if (isConnected) {
    console.log(" Using existing MongoDB connection");
    return;
  }

  if (!process.env.MONGODB_URL) {
    throw new Error("❌ Missing MONGO_URI in environment variables");
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "adamsilva",
    });

    isConnected = db.connections[0].readyState === 1;

    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}
