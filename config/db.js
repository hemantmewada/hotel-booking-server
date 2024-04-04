const mongoose = require("mongoose");
const conf = require("./conf");

const dbConn = async () => {
  try {
    const conn = await mongoose.connect(conf.MONGO_URL);
    console.log(
      `mongo db connected successfully. ${conn.connection.host}`.bgGreen
    );
  } catch (error) {
    console.log(`Error in db connection ${error}`.bgRed);
  }
};

module.exports = dbConn;
