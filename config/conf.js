const dotenv = require("dotenv");

dotenv.config();

const conf = {
  PORT: String(process.env.PORT),
  MONGO_URL: String(process.env.MONGO_URL),
  JWT_SECERT: String(process.env.JWT_SECERT),
};

module.exports = conf;
