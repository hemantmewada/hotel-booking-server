const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    listingId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "listing",
    },
    hostId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("booking", bookingSchema);
