const express = require("express");
const authentication = require("../middlewares/authentication");
const {
  postjob,
  getalljob,
  getadminjobs,
  getjobbyid,
} = require("../controllers/jobcontroller");

const route = express.Router();

route.post("/postjob", authentication, postjob);
route.get("/get", authentication, getalljob);
route.get("/getadminjob", authentication, getadminjobs);
route.get("/get/:id", authentication, getjobbyid);

module.exports = route;
