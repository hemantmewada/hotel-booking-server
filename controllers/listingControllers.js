const listingModel = require("../models/listingModel");
const userModel = require("../models/userModel");

const createListingController = async (req, res) => {
  try {
    const {
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      title,
      description,
      highlight,
      highlightDescription,
      price,
    } = req.body;
    const photos = req.files;
    let listingPhotos = [];
    if (photos) {
      listingPhotos = photos.map((photo) => photo.path);
    }
    const listing = new listingModel({
      createdBy: req.userInfo._id,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      title,
      description,
      highlight,
      highlightDescription,
      price,
      photos: listingPhotos,
    });
    const newListing = await listing.save();
    if (newListing) {
      return res.status(201).send({
        status: true,
        message: "Listing created successfully.",
        data: newListing,
      });
    } else {
      return res.status(201).send({
        status: false,
        message: "Listing not created.",
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: `Error in createListingController api : ${error.message}`,
      error,
    });
  }
};
const getListingController = async (req, res) => {
  try {
    const { category } = req.query;
    let condition = {};
    if (category != "All") {
      condition = { category };
    } else {
      condition = {};
    }
    const listing = await listingModel
      .find(condition)
      .populate("createdBy")
      .sort({ createdAt: -1 });
    if (listing) {
      return res.status(201).send({
        status: true,
        message: "Listings.",
        data: listing,
      });
    } else {
      return res.status(400).send({
        status: false,
        message: "No listings were found.",
        data: listing,
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: `Error in getListingController api : ${error.message}`,
      error,
    });
  }
};
const getSingleListingController = async (req, res) => {
  try {
    const { _id } = req.params;
    const listing = await listingModel.findById(_id).populate("createdBy");
    if (listing) {
      return res.status(201).send({
        status: true,
        message: "Single Listing.",
        data: listing,
      });
    } else {
      return res.status(400).send({
        status: false,
        message: "Something went wrong.",
        data: listing,
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: `Error in getSingleListingController api : ${error.message}`,
      error,
    });
  }
};

// wishlist controller
const wishlistActionController = async (req, res) => {
  try {
    const { _id } = req.params;
    const user = await userModel.findById(req.userInfo._id);
    if (user.wishList.includes(_id)) {
      const index = user.wishList;
      user.wishList.splice(index, 1);
      await user.save();
      const updatedUser = await userModel
        .findById(req.userInfo._id)
        .populate("wishList");
      return res.status(201).send({
        status: true,
        message: "Removed from your Wishlist.",
        data: updatedUser,
      });
    } else {
      user.wishList.push(_id);
      await user.save();
      const updatedUser = await userModel
        .findById(req.userInfo._id)
        .populate("wishList");
      return res.status(201).send({
        status: true,
        message: "Added to your Wishlist.",
        data: updatedUser,
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: `Error in wishlistActionController api : ${error.message}`,
      error,
    });
  }
};

// wishlist controller
const wishlistController = async (req, res) => {
  try {
    return res.status(200).send({
      status: true,
      message: "wishlist.",
      data: req.userInfo.wishList,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: `Error in wishlistController api : ${error.message}`,
      error,
    });
  }
};
// wishlist controller
const wishlistWithDetailController = async (req, res) => {
  try {
    const wishlist = await userModel
      .findById(req.userInfo)
      .populate("wishList");
    return res.status(200).send({
      status: true,
      message: "wishlist.",
      data: wishlist,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: `Error in wishlistWithDetailController api : ${error.message}`,
      error,
    });
  }
};
// propertylist controller
const propertylistController = async (req, res) => {
  try {
    const propertylist = await listingModel.find({ createdBy: req.userInfo });
    return res.status(200).send({
      status: true,
      message: "propertylist.",
      data: propertylist,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: `Error in propertylistController api : ${error.message}`,
      error,
    });
  }
};

const categoryWiseListingController = async (req, res) => {
  try {
    const { category } = req.params;
    const listing = await listingModel.find({ category });
    if (listing.length > 0) {
      return res.status(200).send({
        status: true,
        message: "listing.",
        data: listing,
      });
    } else {
      return res.status(400).send({
        status: false,
        message: "no such listings were found.",
        data: listing,
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: `Error in categoryWiseListingController api : ${error.message}`,
      error,
    });
  }
};
const searchListingController = async (req, res) => {
  try {
    const { search } = req.params;
    let condition = {};
    if (search == "All" || search == "all") {
      condition = {};
    } else {
      condition = {
        $or: [
          { category: { $regex: search, $options: "i" } },
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
          { type: { $regex: search, $options: "i" } },
        ],
      };
    }
    const listings = await listingModel.find(condition).populate("createdBy");
    if (listings.length > 0) {
      return res.status(200).send({
        status: true,
        message: "listings.",
        data: listings,
      });
    } else {
      return res.status(200).send({
        status: true,
        message: "no such listings were found.",
        data: listings,
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: `Error in categoryWiseListingController api : ${error.message}`,
      error,
    });
  }
};

module.exports = {
  createListingController,
  getListingController,
  getSingleListingController,
  wishlistActionController,
  wishlistController,
  wishlistWithDetailController,
  propertylistController,
  categoryWiseListingController,
  searchListingController,
};
