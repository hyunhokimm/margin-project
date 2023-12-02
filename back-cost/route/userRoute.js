const express = require("express");
const { signup, login } = require("../controller/userController");
const userRoute = express.Router();

userRoute.all("/*", function (req, res, next) {
  res.header(
    "Access-Control-Allow-Methods",
    "POST, GET, PUT, PATCH, DELETE, OPTIONS"
  );
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

userRoute.post("/signup", (req, res) => {
  signup(req.body, res);
});

userRoute.post("/login", (req, res) => {
  login(req.body, res);
});

module.exports = userRoute;
