import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    if (!process.env.MONGODB_CONNECTION_STRING) {
      throw new Error('MONGODB_CONNECTION_STRING is not defined in .env file');
    }

    const connection = await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
