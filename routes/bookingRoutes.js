const express = require("express");
const { verifyJWT } = require("../middlewares/authMiddlewares");
const {
  createBookingController,
  getTripsController,
  getReservationListController,
} = require("../controllers/bookingControllers");
const formidableMiddleware = require("express-formidable");

const bookingRouter = express.Router();

// create a booking
bookingRouter
  .route("/create")
  .post(verifyJWT, formidableMiddleware(), createBookingController);

// get all trips that are booke by user
bookingRouter.get("/trips", verifyJWT, getTripsController);

// get all reservations
bookingRouter.get("/reservation-list", verifyJWT, getReservationListController);
module.exports = bookingRouter;
