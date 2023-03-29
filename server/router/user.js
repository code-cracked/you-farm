const express = require("express");

const {
  addUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} = require("../controllers/user");
const router = express.Router();

router.route("/").post(addUser).get(getAllUsers);
router.route("/:phone").get(getUser);

module.exports = {
  userRoutes: router,
};
