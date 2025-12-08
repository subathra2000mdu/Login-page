import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log("Database Connected");
        });

        mongoose.connection.on('error', (err) => {
            console.log("DB Error:", err);
        });

        await mongoose.connect(process.env.MONGO_URI);
    } catch (error) {
        console.log("DB error:", error.message);
        process.exit(1);
    }
};

export default connectDB;
