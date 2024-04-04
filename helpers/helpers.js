const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const conf = require("../config/conf");

const hashedPassword = async (password) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: `Error in hashedPassword : ${error}`,
      error,
    });
  }
};
const comparePassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: `Error in comparePassword : ${error}`,
      error,
    });
  }
};
const generateJWT = async (user) => {
  try {
    const jwt = jsonwebtoken.sign(
      {
        userId: user._id,
        userEmail: user.email,
      },
      conf.JWT_SECERT,
      { expiresIn: "100d" }
    );
    return jwt;
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: `Error in generateJWT : ${error}`,
      error,
    });
  }
};

module.exports = {
  hashedPassword,
  comparePassword,
  generateJWT,
};
