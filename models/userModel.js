const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
      default: "",
    },
    wishList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "listing",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
