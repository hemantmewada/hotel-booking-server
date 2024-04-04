const fs = require("fs");
const { promisify } = require("util");
const { ProductSchema } = require("../validations/schemas");
const userModel = require("../models/userModel");
const {
  generateJWT,
  comparePassword,
  hashedPassword,
} = require("../helpers/helpers");

const unlinkAsync = promisify(fs.unlink);
const signUpController = async (req, res) => {
  try {
    let { firstName, lastName, email, password } = req.body;
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res.status(400).send({
        status: false,
        message: "This email already registered.",
      });
    }
    const profile = req.file;
    let filepath = "";
    if (profile) {
      filepath = profile.path;
    }
    password = await hashedPassword(password);
    let user = new userModel({
      firstName,
      lastName,
      email,
      password,
      profile: filepath,
    });
    user = await user.save();
    if (user) {
      return res.status(201).send({
        status: true,
        message: "User registration successfully.",
        data: user,
      });
    } else {
      return res.status(201).send({
        status: false,
        message: "User not registered.",
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: `Error in signUpController api : ${error.message}`,
      error,
    });
  }
};
const signInController = async (req, res) => {
  try {
    // return res.json(req.fields);
    const { email, password } = req.fields;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        status: false,
        message: "User not found.",
      });
    }
    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      return res.status(401).send({
        status: false,
        message: "Password not match..",
      });
    }
    const token = await generateJWT(user);
    if (user) {
      return res.status(201).send({
        status: true,
        message: "User Logged in successfully.",
        token,
        data: user,
      });
    } else {
      return res.status(201).send({
        status: false,
        message: "User not login.",
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: `Error in signUpController api : ${error.message}`,
      error,
    });
  }
};
const profileController = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.userInfo._id)
      .populate("wishList");
    if (user) {
      return res.status(200).send({
        status: true,
        message: "User profile.",
        data: user,
      });
    } else {
      return res.status(400).send({
        status: false,
        message: "Something went wrong.",
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: `Error in profileController api : ${error.message}`,
      error,
    });
  }
};

module.exports = { signUpController, signInController, profileController };
