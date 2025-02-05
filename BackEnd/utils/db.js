const mongoose = require("mongoose");

const connection = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("database is connected");
  } catch (error) {
    console.error("database is not connected");
  }
};
module.exports = connection;
