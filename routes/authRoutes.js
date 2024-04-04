const express = require("express");
const {
  signUpController,
  signInController,
  profileController,
} = require("../controllers/authControllers");
const {
  signUpValidationSchema,
  signInValidationSchema,
} = require("../validations/schemas");
const {
  validateFormData,
  validate,
  verifyJWT,
} = require("../middlewares/authMiddlewares");
const formidableMiddleware = require("express-formidable");
const multer = require("multer");

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

const authRouter = express.Router();

// sign up the user
authRouter.route("/sign-up").post(
  upload.single("profile"),
  // formidableMiddleware(),
  validate(signUpValidationSchema),
  signUpController
);
// sign up the user
authRouter
  .route("/sign-in")
  .post(
    formidableMiddleware(),
    validateFormData(signInValidationSchema),
    signInController
  );

authRouter.get("/profile", verifyJWT, profileController);

module.exports = authRouter;
