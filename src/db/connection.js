import mongoose from "mongoose";

export const connectMongoDB = async (MONGO_DB_URL) => {
  const connection = await mongoose.connect(MONGO_DB_URL);
  return connection;
};
