const bookingModel = require("../models/bookingModel");

const createBookingController = async (req, res) => {
  try {
    const { listingId, hostId, startDate, endDate, totalPrice } = req.fields;
    let newBooking = new bookingModel({
      userId: req.userInfo._id,
      listingId,
      hostId,
      startDate,
      endDate,
      totalPrice,
    });
    newBooking = await newBooking.save();
    if (newBooking) {
      return res.status(201).send({
        status: true,
        message: "booking created successfully.",
        data: newBooking,
      });
    } else {
      return res.status(400).send({
        status: false,
        message: "booking not created.",
        data: newBooking,
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: `Error in createBookingController api : ${error.message}`,
      error,
    });
  }
};
const getTripsController = async (req, res) => {
  try {
    const trips = await bookingModel
      .find({ userId: req.userInfo._id })
      .populate("userId")
      .populate({
        path: "listingId",
        populate: {
          path: "createdBy",
        },
      });
    if (trips) {
      return res.status(200).send({
        status: true,
        message: "All trips.",
        data: trips,
      });
    } else {
      return res.status(404).send({
        status: false,
        message: "No such trips were found.",
        data: trips,
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: `Error in getTripsController api : ${error.message}`,
      error,
    });
  }
};
const getReservationListController = async (req, res) => {
  try {
    const reservations = await bookingModel
      .find({ hostId: req.userInfo._id })
      .populate("userId")
      .populate({
        path: "listingId",
        populate: {
          path: "createdBy",
        },
      });
    if (reservations) {
      return res.status(200).send({
        status: true,
        message: "All Reservatioons.",
        data: reservations,
      });
    } else {
      return res.status(404).send({
        status: false,
        message: "No such reservatioons were found.",
        data: reservations,
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: `Error in getReservationListController api : ${error.message}`,
      error,
    });
  }
};
module.exports = {
  createBookingController,
  getTripsController,
  getReservationListController,
};
