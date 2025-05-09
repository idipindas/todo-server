import mongoose from 'mongoose';

const connectDB = async () => {
    console.log("mongo==", process.env.MONGO_URI);

    try {
        const conn = await mongoose.connect(`mongodb+srv://ullasraj:20wxLAJzFke3cZ0x@cluster0.q8ursxt.mongodb.net/users`);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

export default connectDB;
