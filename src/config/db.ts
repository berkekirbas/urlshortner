import mongoose from "mongoose";
import config from "config";

const db: string = config.get("mongoUri");

const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDatabase;
