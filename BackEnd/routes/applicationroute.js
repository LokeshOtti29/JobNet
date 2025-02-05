const express = require("express");
const {
  applyjob,
  getappliedjob,
  getapplicants,
  updatestatus,
} = require("../controllers/applicationcontroller");
const authentication = require("../middlewares/authentication");

const route = express.Router();

route.get("/applyjob/:id", authentication, applyjob);
route.get("/get", authentication, getappliedjob);
route.get("/:id/applicant", authentication, getapplicants);
route.post("/status/:id/update", authentication, updatestatus);

module.exports = route;
