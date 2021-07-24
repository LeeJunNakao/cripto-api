import mongoose from 'mongoose';

const uri = process.env.MONGO_DB_URL;

const connectDb = async () => await mongoose.connect(uri);

export { connectDb };
