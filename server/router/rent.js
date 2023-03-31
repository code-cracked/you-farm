const express = require("express");

const { createShow, addRent } = require("../controllers/rent");
const router = express.Router();

router.route("/create").post(createShow);
router.route("/").post(addRent);

module.exports = {
  userRoutes: router,
};
