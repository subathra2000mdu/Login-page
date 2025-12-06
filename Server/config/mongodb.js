import mongoose from "mongoose";

const connectDB = async() =>{
    mongoose.connection.on('connected', () => {
        console.log("Database is Connected");
    })
    mongoose.connection.on('error', err => {
        console.log('DB error:', err);
    });

    await mongoose.connect(`${process.env.MONGO_URI}UserData`);
}

export default connectDB;