import mongoose from "mongoose";
import config from "config";

export const connect = async () => {
  try {
    await mongoose.connect(config.get("mongoURI"), {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    console.log("MongoDB connected ...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
