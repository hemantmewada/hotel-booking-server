const conf = require("../config/conf");
const jsonwebtoken = require("jsonwebtoken");
const userModel = require("../models/userModel");

const validate = (schema) => async (req, res, next) => {
  try {
    const parsedBody = await schema.parseAsync(req.body);
    req.body = parsedBody;
    next();
  } catch (error) {
    const message = error.errors[0].message;
    return res.status(500).send({
      status: false,
      message,
      error,
    });
  }
};
const validateFormData = (schema) => async (req, res, next) => {
  try {
    const parsedBody = await schema.parseAsync(req.fields);
    req.fields = parsedBody;
    next();
  } catch (error) {
    const message = error.errors[0].message;
    return res.status(500).send({
      status: false,
      message,
      error,
    });
  }
};
const verifyJWT = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(401).send({
        status: false,
        message: "Unauthorized request, please use token in header.",
      });
    }
    if (!token.startsWith("Bearer ")) {
      return res.status(401).send({
        status: false,
        message: "Please use token with 'Bearer ' as a prefix",
      });
    }
    token = token.split(" ")[1];
    const isVerified = jsonwebtoken.verify(token, conf.JWT_SECERT);
    if (isVerified) {
      const user = await userModel
        .findById(isVerified.userId)
        .select({ password: 0 });
      req.userInfo = user;
      next();
    } else {
      return res.status(401).send({
        status: false,
        message: `Authentication failed ${error}`,
        error,
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: `Error in verifyJWT : ${error}`,
      error,
    });
  }
};

module.exports = {
  validate,
  validateFormData,
  verifyJWT,
};
