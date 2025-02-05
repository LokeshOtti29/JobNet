const express = require("express");
const {
  registercompany,
  getcompany,
  getcompanybyid,
  updatecompany,
} = require("../controllers/companycontroller");
const authentication = require("../middlewares/authentication");
const singleUpload = require("../middlewares/multer");

const route = express.Router();

route.post("/register", authentication, registercompany);
route.get("/getcompany", authentication, getcompany);
route.get("/getcompany/:id", authentication, getcompanybyid);
route.put("/updatecompany/:id", authentication, singleUpload, updatecompany);

module.exports = route;
