


import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI;

        console.log(`Connecting to: ${uri}`);

        const connectionInstance = await mongoose.connect(uri);

        console.log(`MongoDB connected! DB Host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1);
    }
};

export default connectDB;



