const mongoose = require("mongoose");
const createDefaultAdmin = require("../seed/adminSeeder");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await createDefaultAdmin();
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
