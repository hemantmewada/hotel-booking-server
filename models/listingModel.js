const mongoose = require("mongoose");

const listingShema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    category: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    streetAddress: {
      type: String,
      required: true,
    },
    aptSuite: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    // count: {
    //   type: {
    //     guests: {
    //       type: Number,
    //       required: true,
    //     },
    //     bedrooms: {
    //       type: Number,
    //       required: true,
    //     },
    //     beds: {
    //       type: Number,
    //       required: true,
    //     },
    //     bathrooms: {
    //       type: Number,
    //       required: true,
    //     },
    //   },
    //   // required: true,
    // },
    guestCount: {
      type: Number,
      required: true,
    },
    bedroomCount: {
      type: Number,
      required: true,
    },
    bedCount: {
      type: Number,
      required: true,
    },
    bathroomCount: {
      type: Number,
      required: true,
    },
    amenities: {
      type: Array,
      required: true,
    },
    photos: [{ type: String }],
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    highlight: {
      type: String,
      required: true,
    },
    highlightDescription: {
      type: String,
      required: true,
    },
    price: {
      type: mongoose.Schema.Types.Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("listing", listingShema);
