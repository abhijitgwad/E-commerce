import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URl);
    console.log(`server connected to database ${conn.connection.host}`);
  } catch (error) {
    console.log("error while connecting to database");
  }
};

export default connectDB;
