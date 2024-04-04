const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const colors = require("colors");
const dbConn = require("./config/db");
const conf = require("./config/conf");
const authRouter = require("./routes/authRoutes");
const listingRouter = require("./routes/listingRoutes");
const bookingRouter = require("./routes/bookingRoutes");

// configuration the dotenv
dotenv.config();

const PORT = conf.PORT || 3002;
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// home route
app.get("/", (req, res) => {
  return res.status(200).send({
    status: true,
    message: "This domain's api is managed by @hemantmewada",
  });
});

// other routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/listing", listingRouter);
app.use("/api/v1/booking", bookingRouter);

// running the server
dbConn()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`.bgGreen);
    });
  })
  .catch((error) => {
    console.log(`Something went wrong. ${error}`.bgRed);
  });
