const { z } = require("zod");
const Joi = require("joi");

const signUpValidationSchema = z
  .object({
    firstName: z
      .string({ required_error: "First name is required." })
      .min(5, { message: "First name should be atleast 5 characters." })
      .max(255, { message: "It can't be more than 255 Characters." }),
    lastName: z
      .string({ required_error: "Last name is required." })
      .min(5, { message: "Last name should be atleast 5 characters." })
      .max(255, { message: "It can't be more than 255 Characters." }),
    email: z
      .string({ required_error: "Email  is required." })
      .email({ message: "Invalid type email." }),
    password: z
      .string({ required_error: "Password is required." })
      .min(8, { message: "Password should be atleast 8 characters." }),
    confirmPassword: z
      .string({ required_error: "Confirm password is required." })
      .min(8, { message: "Confirm password should be atleast 8 characters." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "cofirm password didn't match",
    path: ["confirm"],
  });
const signInValidationSchema = z.object({
  email: z
    .string({ required_error: "Email  is required." })
    .email({ message: "Invalid type email." }),
  password: z
    .string({ required_error: "Password is required." })
    .min(8, { message: "Password should be atleast 8 characters." }),
});

// const ProductSchema = Joi.object({
//   title: Joi.string().required().min(5),
//   description: Joi.string().min(3),
//   price: Joi.string().required(),
//   photos: Joi.string(),
// });
const createListingSchema = z.object({
  category: z
    .string({ required_error: "Category is required." })
    .nonempty({ message: "Please select atleast one category." }),
  type: z
    .string({ required_error: "Type is required." })
    .nonempty({ message: "Please select type." }),
  streetAddress: z
    .string({ required_error: "Street Address is required." })
    .min(5, { message: "Street Address should be atleast 5 characters." })
    .max(255, { message: "Street Address can't be more than 255 Characters." })
    .nonempty({ message: "Street Address should not be empty." }),
  aptSuite: z
    .string({ required_error: "aptSuite is required." })
    .min(5, { message: "aptSuite should be atleast 5 characters." })
    .max(255, { message: "aptSuite can't be more than 255 Characters." })
    .nonempty({ message: "aptSuite should not be empty." }),
  city: z
    .string({ required_error: "City is required." })
    .min(2, { message: "City should be atleast 2 characters." })
    .max(255, { message: "City can't be more than 255 Characters." })
    .nonempty({ message: "City should not be empty." }),
  province: z
    .string({ required_error: "Province is required." })
    .min(2, { message: "Province should be atleast 2 characters." })
    .max(255, { message: "Province can't be more than 255 Characters." })
    .nonempty({ message: "Province should not be empty." }),
  country: z
    .string({ required_error: "Country is required." })
    .min(2, { message: "Country should be atleast 2 characters." })
    .max(255, { message: "Country can't be more than 255 Characters." })
    .nonempty({ message: "Country should not be empty." }),
  title: z
    .string({ required_error: "Title is required." })
    .min(2, { message: "Title should be atleast 2 characters." })
    .max(255, { message: "Title can't be more than 255 Characters." })
    .nonempty({ message: "Title should not be empty." }),
  description: z
    .string({ required_error: "Description is required." })
    .min(2, { message: "Description should be atleast 2 characters." })
    .max(255, { message: "Description can't be more than 255 Characters." })
    .nonempty({ message: "Description should not be empty." }),
  highlight: z
    .string({ required_error: "Highlight is required." })
    .min(2, { message: "Highlight should be atleast 2 characters." })
    .max(255, { message: "Highlight can't be more than 255 Characters." })
    .nonempty({ message: "Highlight should not be empty." }),
  highlightDescription: z
    .string({ required_error: "Highlight Description is required." })
    .min(2, {
      message: "Highlight Description should be atleast 2 characters.",
    })
    .max(255, {
      message: "Highlight Description can't be more than 255 Characters.",
    })
    .nonempty({ message: "Highlight Description should not be empty." }),
  price: z
    .string({
      required_error: "Price is required.",
      invalid_type_error: "Price must be number.",
    })
    .min(1, { message: "Price should be greater than 1." }),
  guestCount: z
    .string({
      required_error: "Guest count is required.",
      invalid_type_error: "Guest count must be number.",
    })
    .min(1, { message: "Guest count should be greater than 1." }),
  bedroomCount: z
    .string({
      required_error: "Bedroom count is required.",
      invalid_type_error: "Bedroom count must be number.",
    })
    .min(1, { message: "Bedroom count should be greater than 1." }),
  bedCount: z
    .string({
      required_error: "Bed count is required.",
      invalid_type_error: "Bed count must be number.",
    })
    .min(1, { message: "Bed count should be greater than 1." }),
  bathroomCount: z
    .string({
      required_error: "Bathroom count is required.",
      invalid_type_error: "Bathroom count must be number.",
    })
    .min(1, { message: "Bathroom count should be greater than 1." }),
  // amenities: z.array(),
  amenities: z
    .string({ required_error: "Please select atleast one amenity." })
    .array(),
  count: z.optional(z.object()),
});

module.exports = {
  signUpValidationSchema,
  signInValidationSchema,
  createListingSchema,
};
