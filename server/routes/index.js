const express = require("express");
const router = express.Router();

const addProject = require("./admin/addProject");
const addFaculty = require("./admin/addFaculty")
const loginCheck = require("./admin/loginCheck");
const srsForm = require("./faculty/srsForm");
const basicForm = require("./faculty/basicForm");
const facultyProjectHome = require("./faculty/projectHome");
const review = require("./faculty/review");
const files = require("./faculty/files");
const report = require("./admin/report");

router.use("/addproject", addProject);
router.use("/addFaculty", addFaculty);
router.use("/loginCheck", loginCheck);
router.use("/srsForm", srsForm);
router.use("/basicForm", basicForm);
router.use("/facultyProjectHome", facultyProjectHome);
router.use("/review", review);
router.use("/files", files);
router.use("/report", report);

module.exports = router;
