import mongoose from "mongoose";

const dbConnect = () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  mongoose.set("strictQuery", false);
  //   mongoose.connect(
  //     "mongodb+srv://saadalamgir18:x9K1XLrpMsXwwth2@cluster0.vqpdxmb.mongodb.net/buyitnow"
  //   );
  mongoose.connect(process.env.MONGODB_URL);
};

export default dbConnect;
