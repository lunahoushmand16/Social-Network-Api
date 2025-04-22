import mongoose from 'mongoose';

// Function to connect to MongoDB
const db = async (): Promise<typeof mongoose.connection> => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialNetworkDB');
    console.log('🟢 MongoDB connected.');
    return mongoose.connection;
  } catch (error) {
    console.error('🔴 MongoDB connection error:', error);
    throw new Error('Database connection failed.');
  }
};

export default db;