const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  MONGO_DATABASE: process.env.MONGO_DATABASE || "spotsdb",
  MONGO_DATABASE_TEST: process.env.MONGO_DATABASE_TEST || "spotsdbtest",
  MONGO_USER: process.env.MONGO_USER || "admin",
  MONGO_PASSWORD: process.env.MONGO_PASSWORD || "admin",
  MONGO_HOST: process.env.MONGO_HOST || "localhost",
};
