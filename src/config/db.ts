import mongoose from 'mongoose';

const connectDB = async () => {
    console.log("mongo==", process.env.MONGO_URI);

    try {
        const conn = await mongoose.connect(`mongodb+srv://dipinexpressare:dipin@cluster0.fg4kmmu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

export default connectDB;
