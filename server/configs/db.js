import mongoose from "mongoose";



// --- Mongoose Connection Event Listeners ---
// These listeners run automatically whenever the connection status changes.
// They help monitor MongoDB connection health and log useful messages to the console.
mongoose.connection.on("connected", () => {
  console.log("✅ MongoDB Connected Successfully");
  // console.log("📦 Database name:", mongoose.connection.name);
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB Connection Error:", err.message);
});


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error.message);
  }
};

export default connectDB;
