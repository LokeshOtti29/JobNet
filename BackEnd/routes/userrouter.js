const express = require("express");
const {
  register,
  login,
  updateProfile,
  logout,
} = require("../controllers/usercontroller");
const Authenticated = require("../middlewares/authentication");
const singleUpload = require("../middlewares/multer");
const route = express.Router();

route.post("/register", singleUpload, register);
route.post("/login", login);
route.get("/logout", logout);
route.post("/profileUpdate", Authenticated, singleUpload, updateProfile);

module.exports = route;
