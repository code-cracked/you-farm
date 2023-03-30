const express = require("express");

const {
  addUser,
  deleteUser,
  getAllUsers,
  getUser,
  signIn,
  updateUser,
} = require("../controllers/user");
const router = express.Router();

router.route("/").post(addUser).get(getAllUsers);
router.route("/:phone").get(getUser);
router.route("/signin").post(signIn);

module.exports = {
  userRoutes: router,
};
