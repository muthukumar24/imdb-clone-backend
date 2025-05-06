const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const getUserById  = require("../models/userModel.js");

dotenv.config();

const isAuthenticated = async (req, res, next) => {
  let token;
  if (req.headers) {
    try {
      token = await req.headers["x-auth-token"];
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await getUserById(decode.id);
      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  if (!token) {
    return res.status(400).json({ error: "Invalid Authentication Error" });
  }
};

module.exports = isAuthenticated;