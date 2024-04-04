const express = require("express");
const {
  createListingController,
  getListingController,
  getSingleListingController,
  wishlistActionController,
  wishlistController,
  wishlistWithDetailController,
  propertylistController,
  categoryWiseListingController,
  searchListingController,
} = require("../controllers/listingControllers");
const multer = require("multer");
const { createListingSchema } = require("../validations/schemas");
const { validate, verifyJWT } = require("../middlewares/authMiddlewares");
const formidableMiddleware = require("express-formidable");

// multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + "-";
    cb(null, uniqueSuffix + file.originalname);
  },
});
const upload = multer({ storage });

const listingRouter = express.Router();

// create listing
listingRouter.route("/create").post(
  verifyJWT,
  upload.array("photos"),
  // formidableMiddleware(),
  validate(createListingSchema),
  createListingController
);

// get  listing
listingRouter.route("/").get(getListingController);

// get single listing
listingRouter.route("/single/:_id").get(getSingleListingController);

// add or remove the wishlist
listingRouter
  .route("/wishlist-action/:_id")
  .get(verifyJWT, wishlistActionController);

// get list of wishlist listings
listingRouter.route("/wishlist").get(verifyJWT, wishlistController);

// get list of wishlist listings with detail
listingRouter
  .route("/wishlist-with-detail")
  .get(verifyJWT, wishlistWithDetailController);

// get list of property listings with detail
listingRouter.route("/property-list").get(verifyJWT, propertylistController);

// category wise
listingRouter.route("/category/:category").get(categoryWiseListingController);

// search listing
listingRouter.route("/search/:search").get(searchListingController);
module.exports = listingRouter;
