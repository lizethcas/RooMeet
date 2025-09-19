import mongoose from "mongoose"



export async function mongoConfig() {
    try {
      const mongoUri = process.env.MONGO_URI;
      await mongoose.connect(mongoUri);
      console.log("MongoDB conectado ✅ a la base de datos: roomeet");
    } catch (err) {
      console.error("Error conectando MongoDB:", err);
      throw err;
    }
  }

mongoose.connection.on("error", (error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
});

mongoose.connection.on("disconnected", () => {
    console.log("Disconnected from MongoDB");
   
});
  
mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
});