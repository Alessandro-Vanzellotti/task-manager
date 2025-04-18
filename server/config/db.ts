import mongoose from 'mongoose';

const MONGO_URI = 'mongodb+srv://Alessandro_Vanzellotti:ale212121@cluster0.vvmky8b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async () =>  {
    try {
        await mongoose.connect(MONGO_URI, {});
        console.log("MongoDB connected");
    } catch (err) {
        console.error("Error connecting to MongoDB, err");
        console.log(MONGO_URI);
        process.exit(1);
    }
};

export default connectDB;